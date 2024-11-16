<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include '../dbconnect.php';

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$sql = "SELECT applications.id, grants.title, User.fullName as researcher, grants.amount, applications.status
        FROM applications
        JOIN grants ON applications.grant_id = grants.id
        JOIN User ON applications.user_id = User.id
        ORDER BY applications.applied_date DESC";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $applications = [];
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
    echo json_encode(["success" => true, "applications" => $applications]);
} else {
    echo json_encode(["success" => false, "message" => "No applications found"]);
}

// Close connection
$conn->close();
