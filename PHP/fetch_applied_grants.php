<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../dbconnect.php';

// Retrieve user_id from GET parameters
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit;
}

$sql = "SELECT applications.id, grants.title, grants.amount, grants.deadline, applications.status
        FROM applications
        JOIN grants ON applications.grant_id = grants.id
        WHERE applications.user_id = ?
        ORDER BY applications.applied_date DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$appliedGrants = [];
while ($row = $result->fetch_assoc()) {
    $appliedGrants[] = $row;
}

if (!empty($appliedGrants)) {
    echo json_encode(["success" => true, "appliedGrants" => $appliedGrants]);
} else {
    echo json_encode(["success" => true, "appliedGrants" => []]);
}

$stmt->close();
$conn->close();
