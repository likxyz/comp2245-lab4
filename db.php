
<?php
//serves as a middleman of sorts between mySQL database and PHP application

//loads the database
require __DIR__ . '/config.php';

//attempts to connect to mySQL
try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
}
//Handles errors
catch (PDOException $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Could not connect to the database.']);
    exit;
}