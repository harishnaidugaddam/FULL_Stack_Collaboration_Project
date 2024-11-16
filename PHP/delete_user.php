<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");  // This allows requests from any origin
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow content-type and authorization headers
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");  // Allow these methods
header("Content-Type: application/json");

// Handle preflight OPTIONS request (necessary for CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit(0);  // Respond to the preflight request and stop further execution
}

include '../dbconnect.php';  // Include your DB connection file

// Decode incoming JSON data
$data = json_decode(file_get_contents("php://input"));

// Check if the ID is provided
if (!isset($data->id)) {
    echo json_encode(["status" => "error", "message" => "User ID is required."]);
    exit;
}

// Sanitize the user ID input
$userID = (int)$data->id;

// Prepare the delete query using a prepared statement
$sql = "DELETE FROM User WHERE id = ?";

// Create a prepared statement
$stmt = $conn->prepare($sql);

// Check if statement was prepared successfully
if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare the query."]);
    exit;
}

// Bind parameters
$stmt->bind_param("i", $userID);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User deleted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error deleting user: " . $stmt->error]);
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
