<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ProjectDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["message" => "Database connection failed", "error" => $conn->connect_error]);
    exit();
}

// Capture and decode the JSON input
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        "message" => "Invalid JSON input",
        "error" => json_last_error_msg(),
        "raw_input" => $rawInput
    ]);
    exit();
}

// Validate required fields
$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$query = $data['query'] ?? null;
$user_id = $data['userID'] ?? null; // Ensure this is the correct field in the JSON payload

if (!$name || !$email || !$query) {
    echo json_encode(["message" => "Missing required fields."]);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "Invalid email format."]);
    exit();
}

// Sanitize input data
$name = $conn->real_escape_string($name);
$email = $conn->real_escape_string($email);
$query = $conn->real_escape_string($query);
$user_id = $user_id ? $conn->real_escape_string($user_id) : null;

// Insert into the database
$sql = "INSERT INTO ContactSupport (name, email, question, status, user_id) VALUES (?, ?, ?, 'Pending', ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["message" => "SQL statement preparation failed", "error" => $conn->error]);
    exit();
}

// Bind parameters, including optional user_id
if ($user_id) {
    $stmt->bind_param("ssss", $name, $email, $query, $user_id);
} else {
    $stmt->bind_param("sss", $name, $email, $query);
}

// Execute the statement and handle the result
if ($stmt->execute()) {
    echo json_encode(["message" => "Your query has been submitted. We will get back to you as soon as possible."]);
} else {
    echo json_encode(["message" => "Failed to submit your query", "error" => $stmt->error]);
}

// Close statement and database connection
$stmt->close();
$conn->close();
