<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../dbconnect.php';

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit;
}

$sql = "
    SELECT e.id, e.name, e.description, e.start_date, e.end_date, e.location, e.organiser, e.max_participants
    FROM events e
    LEFT JOIN registered_events re ON e.id = re.event_id AND re.user_id = ?
    WHERE re.event_id IS NULL
    ORDER BY e.start_date ASC
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$events = [];
while ($row = $result->fetch_assoc()) {
    $events[] = $row;
}

if (!empty($events)) {
    echo json_encode(["success" => true, "events" => $events]);
} else {
    echo json_encode(["success" => false, "message" => "No available events found"]);
}

$stmt->close();
$conn->close();