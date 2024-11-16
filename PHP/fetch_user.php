<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../dbconnect.php';

// Get the userID from the GET request
$userID = isset($_GET['userID']) ? $_GET['userID'] : null;

if (!$userID) {
    echo json_encode(["status" => "error", "message" => "User ID is required."]);
    exit;
}

$userID = $conn->real_escape_string($userID);

// Query to fetch full user data including fullName, email, and role
$sql = "SELECT fullName, email, role FROM User WHERE id = '$userID'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["status" => "success", "data" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "User not found."]);
}

$conn->close();
