<?php
// Include the database connection file
include 'db_connect.php';

// Check if the connection was successful
if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error;
} else {
    echo "Database connection successful!";
}

// Close the connection
$conn->close();
?>