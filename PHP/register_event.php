<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../dbconnect.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;
$event_id = $data['event_id'] ?? null;

if (!$user_id || !$event_id) {
    echo json_encode(["success" => false, "message" => "User ID and Event ID are required."]);
    exit;
}

// Check if the user is already registered for the event
$sql = "SELECT * FROM registered_events WHERE user_id = ? AND event_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $event_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "You are already registered for this event."]);
} else {
    // Register the user for the event
    $stmt = $conn->prepare("INSERT INTO registered_events (user_id, event_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $event_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Successfully registered for the event."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to register for the event: " . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
