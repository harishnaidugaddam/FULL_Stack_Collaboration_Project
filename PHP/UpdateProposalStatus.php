<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept");

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ProjectDB";

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the request based on the HTTP method
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all proposals
    $sql = "SELECT id, title, description, amount, status FROM Proposals";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $proposals = [];
        while ($row = $result->fetch_assoc()) {
            $proposals[] = $row;
        }
        echo json_encode($proposals);  // Send proposals as JSON response
    } else {
        echo json_encode([]);  // No proposals found
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Update the status of a proposal
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['id']) && isset($input['status'])) {
        $id = $input['id'];
        $status = $input['status'];

        // Update the proposal's status in the database
        $sql = "UPDATE Proposals SET status = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $status, $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Status updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update status']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

// Close the database connection
$conn->close();
