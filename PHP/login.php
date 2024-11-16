<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../dbconnect.php'; // Adjust this path as necessary

// Read JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if email and password are provided
if (!$data || !isset($data->email, $data->password)) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit;
}

// Sanitize and assign input data
$email = $conn->real_escape_string($data->email);
$password = $data->password;

// Query to check the email
$sql = "SELECT * FROM User WHERE email = '$email'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Verify the password
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "status" => "success",
            "userID" => $user['id'],    // Include userID in response
            "role" => $user['role']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found."]);
}

// Close the database connection
$conn->close();
