<?php
// Get the URL and query string
$url = $_SERVER['REQUEST_URI'];
$encoded_query_string = parse_url($url, PHP_URL_QUERY);

// Decode the encoded query string
$query_string = urldecode($encoded_query_string);

// $query_string = "https://monetise.leadbyte.co.uk/restapi/v1.2/leads";
// var_dump($query_string);

// Get the request body
$request_body = file_get_contents('php://input');

// Initialize cURL
$ch = curl_init();

// Set cURL options based on request method
$request_method = $_SERVER['REQUEST_METHOD'];
if ($request_method === 'POST') {
    // POST request
    $request_body = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_URL, $query_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_body);
    curl_setopt(
        $ch,
        CURLOPT_HTTPHEADER,
        array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($request_body)
        )
    );
} else {
    // GET request
    curl_setopt($ch, CURLOPT_URL, $query_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
}


// Execute the cURL request
$response = curl_exec($ch);

// Check for errors
if ($response === false) {
    $error = curl_error($ch);
    echo "cURL error: $error";
} else {
    // Return the JSON response
    header('Content-Type: application/json');
    echo $response;
}

// Close cURL
curl_close($ch);
?>