<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../dbconnect.php';

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit;
}

// Modified query to also fetch the description of events
$sql = "
    SELECT e.event_id, e.title, e.start_date, e.end_date, e.location, e.organiser, e.max_participants, e.description
    FROM events e
    INNER JOIN registered_events re ON e.event_id = re.event_id
    WHERE re.user_id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$registeredEvents = [];
while ($row = $result->fetch_assoc()) {
    $registeredEvents[] = [
        'event_id' => $row['event_id'],
        'title' => $row['title'], // event name
        'start_date' => $row['start_date'], // event start date
        'end_date' => $row['end_date'], // event end date
        'location' => $row['location'],
        'organiser' => $row['organiser'],
        'max_participants' => $row['max_participants'],
        'description' => $row['description'] // event description
    ];
}

if (!empty($registeredEvents)) {
    echo json_encode(["success" => true, "registeredEvents" => $registeredEvents]);
} else {
    echo json_encode(["success" => false, "message" => "No registered events found"]);
}

$stmt->close();
$conn->close();
