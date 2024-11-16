<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Destroy the session and clear all session variables
session_unset();
session_destroy();

// Send a JSON response back to the frontend
echo json_encode(["status" => "success", "message" => "Logged out successfully."]);