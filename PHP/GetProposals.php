<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Allow all origins to make requests (for development purposes)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept");

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

// SQL query to get proposals from the Proposals table
$sql = "SELECT title, status, amount, file FROM Proposals";
$result = $conn->query($sql);

// Check if any rows were returned
if ($result->num_rows > 0) {
    $proposals = [];

    // Fetch each row and store it in an array
    while ($row = $result->fetch_assoc()) {
        // Make the file path a relative URL
        $row['file'] = 'uploads/' . basename($row['file']);
        $proposals[] = $row;
    }

    // Return the proposals as a JSON response
    echo json_encode($proposals);
} else {
    echo json_encode([]); // Return an empty array if no proposals found
}

// Close the database connection
$conn->close();
