<?php
// Ensure CORS headers are included
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../dbconnect.php';

// Decode incoming JSON data
$data = json_decode(file_get_contents("php://input"));

// Check if necessary data is provided
if (!isset($data->id) || !isset($data->name) || !isset($data->email) || !isset($data->password) || !isset($data->role)) {
    echo json_encode(["status" => "error", "message" => "User ID, name, email, password, and role are required."]);
    exit;
}

// Sanitize input data
$userID = (int)$data->id; // Ensure userID is treated as an integer
$name = $conn->real_escape_string($data->name);
$email = $conn->real_escape_string($data->email);
$password = password_hash($data->password, PASSWORD_BCRYPT);  // Hash the password
$role = $conn->real_escape_string($data->role);  // Sanitize the role

// Update the user data in the User table
$sql = "UPDATE User SET fullName = ?, email = ?, password = ?, role = ? WHERE id = ?";

// Prepare the update statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $name, $email, $password, $role, $userID);

// Execute the query
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error updating user: " . $stmt->error]);
}

// Close the database connection
$stmt->close();
$conn->close();
