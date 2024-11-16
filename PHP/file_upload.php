<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = "";     // Replace with your MySQL password
$dbname = "ProjectDb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle file upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $fileName = $_FILES['file']['name'];
        $fileSize = round($_FILES['file']['size'] / 1024, 2) . " KB";
        $uploadDate = date('Y-m-d H:i:s');
        
        // Move uploaded file to server directory
        $targetDirectory = "uploads/";
        if (!file_exists($targetDirectory)) {
            mkdir($targetDirectory, 0777, true);
        }
        $targetFile = $targetDirectory . basename($fileName);
        
        if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
            // Insert file details into the database
            $stmt = $conn->prepare("INSERT INTO uploaded_files (file_name, file_size, upload_date) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $fileName, $fileSize, $uploadDate);
            
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "File uploaded successfully."]);
            } else {
                echo json_encode(["success" => false, "message" => "Error saving file details to database."]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Error uploading file."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "No file uploaded."]);
    }
}

$conn->close();
