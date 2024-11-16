<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "ProjectDB"; // Ensure this matches your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed", "error" => $conn->connect_error]));
}

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

// Fetch events
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'fetch') {
    $sql = "SELECT * FROM Events";
    $result = $conn->query($sql);
    $events = [];

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $events[] = [
                "id" => $row['Event_id'],
                "name" => $row['Title'],
                "description" => $row['Description'],
                "startDate" => $row['Start_date'],
                "endDate" => $row['End_date'],
                "location" => $row['Location'],
                "organiser" => $row['Organiser'],
                "maxParticipants" => $row['Max_participants']
            ];
        }
        echo json_encode(["success" => true, "events" => $events]);
    } else {
        echo json_encode(["success" => false, "message" => "No events found."]);
    }
    exit();
}

// Add new event
if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($data['action'])) {
    // Sanitize and prepare input data
    $name = $conn->real_escape_string($data['name']);
    $description = $conn->real_escape_string($data['description']);
    $startDate = $conn->real_escape_string($data['startDate']);
    $endDate = $conn->real_escape_string($data['endDate']);
    $location = $conn->real_escape_string($data['location']);
    $organiser = $conn->real_escape_string($data['organiser']);
    $maxParticipants = (int)$data['maxParticipants'];

    $sql = "INSERT INTO Events (Title, Description, Start_date, End_date, Location, Organiser, Max_participants) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $name, $description, $startDate, $endDate, $location, $organiser, $maxParticipants);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Event added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add event", "error" => $stmt->error]);
    }
    $stmt->close();
}

// Delete event
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['action']) && $data['action'] === 'delete') {
    $eventId = $data['id'];

    $sql = "DELETE FROM Events WHERE Event_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $eventId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Event deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete event", "error" => $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
