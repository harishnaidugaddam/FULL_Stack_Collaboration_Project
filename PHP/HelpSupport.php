<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "ProjectDB"; // Ensure this matches your database name

// Database connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Fetch unanswered questions from ContactSupport and completed queries from HelpSupport
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'fetch') {
    $supportItems = [];

    // Fetch unanswered questions from ContactSupport
    $sql = "SELECT Support_id AS id, Question AS question FROM ContactSupport WHERE Status = 'Pending'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $row['answered'] = false;
            $supportItems[] = $row;
        }
    }

    // Fetch completed queries from HelpSupport
    $sql = "SELECT id, question, answer FROM HelpSupport WHERE answered = 1 ORDER BY updated_at DESC";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $row['answered'] = true;
            $supportItems[] = $row;
        }
    }

    echo json_encode(["success" => true, "supportItems" => $supportItems]);
    exit();
}

// Answer question
$data = json_decode(file_get_contents("php://input"), true);
$action = isset($data['action']) ? $data['action'] : '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'answer') {
    $id = $data['data']['id'];
    $answer = $data['data']['answer'];

    if (!$id || !$answer) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit();
    }

    // Insert answered question into HelpSupport and update ContactSupport status
    $stmt = $conn->prepare("INSERT INTO HelpSupport (question, answer, answered) SELECT Question, ?, 1 FROM ContactSupport WHERE Support_id = ?");
    $stmt->bind_param("si", $answer, $id);

    if ($stmt->execute()) {
        // Update status in ContactSupport to 'Answered'
        $updateStmt = $conn->prepare("UPDATE ContactSupport SET Status = 'Answered' WHERE Support_id = ?");
        $updateStmt->bind_param("i", $id);
        $updateStmt->execute();
        $updateStmt->close();

        echo json_encode(["success" => true, "message" => "Answer submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();