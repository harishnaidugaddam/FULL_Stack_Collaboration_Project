<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../dbconnect.php';

// Get the user ID from the request
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required."]);
    exit;
}

// Query to get grants that the user has not applied for
$sql = "
    SELECT g.id, g.title, g.amount, g.deadline 
    FROM grants g
    LEFT JOIN applications a ON g.id = a.grant_id AND a.user_id = ?
    WHERE a.grant_id IS NULL
    ORDER BY g.deadline ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $grants = [];
    while ($row = $result->fetch_assoc()) {
        $grants[] = $row;
    }
    echo json_encode(["success" => true, "grants" => $grants]);
} else {
    echo json_encode(["success" => false, "message" => "No grants found or all grants have been applied for."]);
}

$stmt->close();
$conn->close();