<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);  // Respond to preflight request and stop
}

include '../dbconnect.php';

// Decode incoming JSON data
$data = json_decode(file_get_contents("php://input"));

// Check if necessary data is provided
if (!isset($data->name) || !isset($data->role) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "Name, role, email, and password are required."]);
    exit;
}

// Sanitize input data
$name = $conn->real_escape_string($data->name);
$role = $conn->real_escape_string($data->role);
$email = $conn->real_escape_string($data->email);
$password = password_hash($data->password, PASSWORD_BCRYPT);  // Hash the password for security

// Insert new user into the User table
$sql = "INSERT INTO User (fullName, role, email, password) VALUES ('$name', '$role', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "User added successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error adding user: " . $conn->error]);
}

// Close the database connection
$conn->close();
