<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = "";     // Replace with your MySQL password
$dbname = "ProjectDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];

if ($title) {
    $stmt = $conn->prepare("INSERT INTO topics (title) VALUES (?)");
    $stmt->bind_param("s", $title);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Topic added successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add topic."]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Title is required."]);
}

$conn->close();
?>