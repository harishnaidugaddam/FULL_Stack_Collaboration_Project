<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "ProjectDB"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Handle GET requests to fetch news
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'fetch') {
    $sql = "SELECT id, title, content, uploaded_date FROM RecentNews ORDER BY uploaded_date DESC";
    $result = $conn->query($sql);
    $newsList = [];

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $newsList[] = $row;
        }
        echo json_encode(["success" => true, "news" => $newsList]);
    } else {
        echo json_encode(["success" => false, "message" => "No news found"]);
    }
    exit();
}

// Handle POST requests for add, update, delete actions
$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($action) {
        case 'add':
            $title = $data['data']['title'] ?? '';
            $content = $data['data']['content'] ?? '';

            if ($title && $content) {
                $stmt = $conn->prepare("INSERT INTO RecentNews (title, content) VALUES (?, ?)");
                $stmt->bind_param("ss", $title, $content);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "News added successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Error adding news: " . $stmt->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Missing title or content"]);
            }
            break;

        case 'update':
            $id = $data['data']['id'] ?? '';
            $title = $data['data']['title'] ?? '';
            $content = $data['data']['content'] ?? '';

            if ($id && $title && $content) {
                $stmt = $conn->prepare("UPDATE RecentNews SET title=?, content=? WHERE id=?");
                $stmt->bind_param("ssi", $title, $content, $id);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "News updated successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Error updating news: " . $stmt->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Missing ID, title, or content"]);
            }
            break;

        case 'delete':
            $id = $data['data']['id'] ?? '';

            if ($id) {
                $stmt = $conn->prepare("DELETE FROM RecentNews WHERE id=?");
                $stmt->bind_param("i", $id);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "News deleted successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Error deleting news: " . $stmt->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Missing news ID for deletion"]);
            }
            break;

        default:
            echo json_encode(["success" => false, "message" => "Invalid action"]);
            break;
    }
}

$conn->close();
