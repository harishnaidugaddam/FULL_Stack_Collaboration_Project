<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../dbconnect.php';

$data = json_decode(file_get_contents("php://input"), true);
$application_id = $data['application_id'];
$new_status = $data['status'];

if ($application_id && in_array($new_status, ['Pending', 'Ongoing', 'Approved', 'Rejected'])) {
    $stmt = $conn->prepare("UPDATE applications SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $new_status, $application_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Status updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update status"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid status or application ID"]);
}

$conn->close();
?>