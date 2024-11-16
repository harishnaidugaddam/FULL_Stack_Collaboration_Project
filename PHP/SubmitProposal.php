<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Allow all origins to make requests (for development purposes)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Set content-type to JSON
header("Content-Type: application/json");

// Database connection settings
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "ProjectDB"; // Ensure this matches your database name

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Ensure the file was uploaded
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        // Retrieve POST data
        $title = isset($_POST['title']) ? $_POST['title'] : '';
        $description = isset($_POST['description']) ? $_POST['description'] : '';
        $amount = isset($_POST['amount']) ? $_POST['amount'] : 0;

        // Validate file size (should be under the max upload size)
        if ($_FILES['file']['size'] > 64 * 1024 * 1024) {
            echo json_encode(["success" => false, "message" => "File size exceeds the allowed limit of 64MB."]);
            exit;
        }

        // Define the upload directory (absolute path)
        $uploadDirectory = '/Applications/XAMPP/xamppfiles/htdocs/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/uploads/';

        // Check if the directory is writable
        if (!is_writable($uploadDirectory)) {
            echo json_encode(["success" => false, "message" => "Upload directory is not writable."]);
            exit;
        }

        // Generate a unique file name to prevent overwriting
        $fileName = uniqid() . '-' . basename($_FILES['file']['name']);
        $filePath = $uploadDirectory . $fileName;

        // Debugging: Check if the file path is being generated correctly
        error_log("Generated file path: " . $filePath);

        // Move the uploaded file to the desired directory
        if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            // Debugging: Check if the file has been moved
            error_log("File moved successfully.");

            // Prepare the SQL query to insert the proposal into the database
            $sql = "INSERT INTO Proposals (title, description, file, amount) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);

            // Check if the prepare was successful
            if ($stmt === false) {
                echo json_encode(["success" => false, "message" => "Failed to prepare SQL statement: " . $conn->error]);
                exit;
            }

            // Bind parameters and execute the query
            $stmt->bind_param("sssd", $title, $description, $filePath, $amount);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Proposal submitted successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to submit proposal. Error: " . $stmt->error]);
            }

            // Close statement
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "File upload failed."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "No file uploaded or file upload error."]);
    }
} else {
    // Handle invalid request method
    echo json_encode(["success" => false, "message" => "Invalid request method. Only POST is allowed."]);
}

// Close the database connection
$conn->close();
?>