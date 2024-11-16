<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ProjectDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'fetch') {
    $sql = "SELECT * FROM grants";
    $result = $conn->query($sql);
    $grants = [];

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $grants[] = $row;
        }
        echo json_encode(["success" => true, "grants" => $grants]);
    } else {
        echo json_encode(["success" => false, "message" => "No grants found"]);
    }
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($action) {
        case 'add':
            $title = $data['data']['title'] ?? '';
            $description = $data['data']['description'] ?? '';
            $funder = $data['data']['funder'] ?? '';
            $amount = $data['data']['amount'] ?? '';
            $deadline = $data['data']['deadline'] ?? '';
            $eligibility = $data['data']['eligibility'] ?? '';

            if ($title && $amount && $deadline) {
                $stmt = $conn->prepare("INSERT INTO grants (title, description, funder, amount, deadline, eligibility) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssss", $title, $description, $funder, $amount, $deadline, $eligibility);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Grant added successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Error adding grant: " . $stmt->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Missing required fields for adding grant"]);
            }
            break;

        case 'update':
            $id = $data['data']['id'] ?? '';
            $title = $data['data']['title'] ?? '';
            $description = $data['data']['description'] ?? '';
            $funder = $data['data']['funder'] ?? '';
            $amount = $data['data']['amount'] ?? '';
            $deadline = $data['data']['deadline'] ?? '';
            $eligibility = $data['data']['eligibility'] ?? '';

            if ($id && $title && $amount && $deadline) {
                $stmt = $conn->prepare("UPDATE grants SET title=?, description=?, funder=?, amount=?, deadline=?, eligibility=? WHERE id=?");
                $stmt->bind_param("ssssssi", $title, $description, $funder, $amount, $deadline, $eligibility, $id);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Grant updated successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Error updating grant: " . $stmt->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Missing required fields for updating grant"]);
            }
            break;

        case 'delete':
            $id = $data['data']['id'] ?? '';

            if ($id) {
                $stmt = $conn->prepare("DELETE FROM grants WHERE id=?");
                $stmt->bind_param("i", $id);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Grant deleted successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Error deleting grant: " . $stmt->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Missing grant ID for deletion"]);
            }
            break;

        default:
            echo json_encode(["success" => false, "message" => "Invalid action"]);
            break;
    }
}

$conn->close();
?>