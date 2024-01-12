<?php

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('error' => 'Only GET requests are allowed'));
    exit;
}

// Get Parameters
$phone = $_GET['phone'];
$api_key = "e85a586bb27e1330b8e7467a73ce2b2e";

$url = "https://monetise.leadbyte.co.uk/restapi/v1.2/validate/mobile?key=".$api_key."&value=".$phone;

// Initialize cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Disable SSL verification (not recommended for production)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Execute cURL request
$curlResponse = curl_exec($ch);

// Check for cURL errors
if ($curlResponse === false) {
    $error = curl_error($ch);
    $errorCode = curl_errno($ch);
    http_response_code(500); // Internal Server Error
    echo json_encode(array('error' => 'Curl error: ' . $error, 'error_code' => $errorCode));
} else {
    // Handle the cURL response as needed
    echo $curlResponse;
}

// Close cURL session
curl_close($ch);
?>
