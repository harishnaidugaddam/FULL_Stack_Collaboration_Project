<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../dbconnect.php';

// Get user ID from the request
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit;
}

// Query to fetch events that the user has not registered for
$sql = "
    SELECT e.event_id, e.title, e.start_date, e.end_date, e.location, e.description, e.organiser, e.max_participants
    FROM events e
    LEFT JOIN registered_events re ON e.event_id = re.event_id AND re.user_id = ?
    WHERE re.event_id IS NULL
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$unregisteredEvents = [];
while ($row = $result->fetch_assoc()) {
    $unregisteredEvents[] = $row;
}

if (!empty($unregisteredEvents)) {
    echo json_encode(["success" => true, "unregisteredEvents" => $unregisteredEvents]);
} else {
    echo json_encode(["success" => false, "message" => "No unregistered events found"]);
}

$stmt->close();
$conn->close();
