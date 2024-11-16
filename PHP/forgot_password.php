<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../dbconnect.php';

// Decode JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if email is provided for verification or password reset
if (isset($data->email) && !isset($data->newPassword)) {
    $email = $conn->real_escape_string($data->email);

    // Check if email exists in the User table
    $sql = "SELECT * FROM User WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Email verified. Please enter a new password."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Email not found."]);
    }
} elseif (isset($data->email) && isset($data->newPassword)) {
    $email = $conn->real_escape_string($data->email);
    $newPassword = password_hash($data->newPassword, PASSWORD_DEFAULT);

    // Update the password for the given email
    $sql = "UPDATE User SET password = '$newPassword' WHERE email = '$email'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Password has been successfully updated."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update password. Please try again."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}

$conn->close();
