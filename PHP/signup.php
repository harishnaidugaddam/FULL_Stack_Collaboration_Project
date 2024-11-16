<?php
// Display and log errors for debugging purposes
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../dbconnect.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if all required fields are available
if (!$data || !isset($data->fullName, $data->email, $data->password, $data->role)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Sanitize and process data
$fullName = $conn->real_escape_string($data->fullName);
$email = $conn->real_escape_string($data->email);
$password = password_hash($data->password, PASSWORD_DEFAULT); // Hash the password
$role = $conn->real_escape_string($data->role);

// Restrict role to "Researcher" or "Funder" only
if (!in_array($role, ['Researcher', 'Funder'])) {
    echo json_encode(["status" => "error", "message" => "Invalid role selected."]);
    exit;
}

// Check if email already exists
$checkEmailQuery = "SELECT * FROM User WHERE email = '$email'";
$result = $conn->query($checkEmailQuery);

if ($result && $result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email is already registered."]);
} else {
    // Insert user data into the User table
    $sql = "INSERT INTO User (fullName, email, password, role) VALUES ('$fullName', '$email', '$password', '$role')";
    if ($conn->query($sql) === TRUE) {
        // After successful user signup
        $userId = $conn->insert_id; // Get the ID of the newly created user

        // Insert into Profile table with default values
        $profileSql = "INSERT INTO Profile (user_id) VALUES ('$userId')";
        if ($conn->query($profileSql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "User registered successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "User registered, but an error occurred while creating the profile: " . $conn->error]);
        }
    } else {
        // Output the specific MySQL error
        echo json_encode(["status" => "error", "message" => "An error occurred while registering the user: " . $conn->error]);
    }
}

$conn->close();