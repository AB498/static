<?php
// Custom error handler
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    $logMessage = "Error: [$errno] $errstr in $errfile on line $errline\n";
    error_log($logMessage, 3, './error.log');
    header('Content-Type: application/json');
    echo json_encode(["error" => $logMessage]);
    exit();
});

// Custom exception handler
set_exception_handler(function ($exception) {
    $logMessage = "Exception: " . $exception->getMessage() . "\n";
    error_log($logMessage, 3, './error.log');
    header('Content-Type: application/json');
    echo json_encode(["error" => $logMessage]);
    exit();
});

try {

    // if query is empty
    $url = $_SERVER['REQUEST_URI'];
    $encoded_query_string = parse_url($url, PHP_URL_QUERY);

    if ($encoded_query_string === false) {
        throw new Exception("Invalid query string in URL.");
    }

    // Decode the encoded query string
    $query_string = urldecode($encoded_query_string);
    // print_r($query_string);

    // Get the request body
    $request_body = file_get_contents('php://input');
    if ($request_body === false) {
        throw new Exception("Failed to get request body.");
    }

    // Initialize cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    if ($ch === false) {
        throw new Exception("Failed to initialize cURL.");
    }

    // Set cURL options based on request method
    $request_method = $_SERVER['REQUEST_METHOD'];
    if ($request_method === 'POST') {
        // POST request
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
        file_put_contents('php://stderr', print_r($request_body, TRUE));
    } else {

        // GET request
        curl_setopt($ch, CURLOPT_URL, $query_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

    }

    // Execute the cURL request
    $response = curl_exec($ch);
    if ($response === false) {
        throw new Exception("cURL error: " . curl_error($ch));
    }

    // Return the JSON response
    header('Content-Type: application/json');
    echo $response;

    // Close cURL
    curl_close($ch);

} catch (Exception $e) {
    $logMessage = "Exception: " . $e->getMessage() . "\n";
    error_log($logMessage, 3, './error.log');
    header('Content-Type: application/json');
    echo json_encode(["error" => $logMessage]);
    exit();
}

// Restore original error and exception handlers
restore_error_handler();
restore_exception_handler();
?>