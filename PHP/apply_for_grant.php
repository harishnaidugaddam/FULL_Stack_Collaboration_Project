<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../dbconnect.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;
$grant_id = $data['grant_id'] ?? null;

if (!$user_id || !$grant_id) {
    echo json_encode(["success" => false, "message" => "User ID and Grant ID are required."]);
    exit;
}

// Check if an application already exists for this user and grant
$sql = "SELECT * FROM applications WHERE user_id = ? AND grant_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $grant_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch existing application details
    $existing_application = $result->fetch_assoc();

    // Check the status of the existing application
    if ($existing_application['status'] == 'Pending') {
        echo json_encode(["success" => false, "message" => "Application is already pending."]);
    } else {
        echo json_encode(["success" => false, "message" => "Application already processed with status: " . $existing_application['status']]);
    }
} else {
    // If no existing application, create a new application with 'Pending' status
    $stmt = $conn->prepare("INSERT INTO applications (user_id, grant_id, status) VALUES (?, ?, 'Pending')");
    $stmt->bind_param("ii", $user_id, $grant_id);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Application submitted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit application: " . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
