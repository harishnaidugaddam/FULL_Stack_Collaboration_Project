<?php
// Display errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Database connection details
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "ProjectDB"; // Ensure this matches your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// SQL query to fetch news
$sql = "SELECT title, content, uploaded_date FROM RecentNews ORDER BY uploaded_date DESC LIMIT 3";
$result = $conn->query($sql);

$news = [];
if ($result) {
    while($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
    echo json_encode(["success" => true, "news" => $news]);
} else {
    echo json_encode(["success" => false, "message" => "Error executing query: " . $conn->error]);
}

$conn->close();
