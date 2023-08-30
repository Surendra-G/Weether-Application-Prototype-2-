<?php

//Database configuration
$servername = "localhost";
$username =  "root"
$password = "";
$dbname = "weather_db";

//creating a connection
$conn = new mysli("localhost","root","","weather_db");

//checking the connection
if ($conn->connect.error){
    die("Connection Failed".$conn->connect_error);
}

// Create the database if it doesn't exist
$create_db_sql = "CREATE DATABASE IF NOT EXISTS weather_db";
if ($conn_create->query($create_db_sql) === TRUE) {
    echo "Database created successfully or already exists";
} else {
    echo "Error creating database: " . $conn_create->error;
}

// Close the connection used for creating the database
$conn_create->close();

// Create a connection to the newly created database
$dbname = "weather_db";
$conn = new mysqli("localhost","root", "", "weather_db");

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the city from the request
$city = $_GET['city'];

// Query the database to check if data is cached
$sql = "SELECT * FROM weather_cache WHERE city = '$city' AND timestamp >= NOW() - INTERVAL 1 HOUR";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Data is cached, return cached data
    $row = $result->fetch_assoc();
    echo $row['data'];
} else {
    // Data is not cached, fetch from OpenWeatherMap API
    $api_key = '61a022f39f51f59d4fec11ef3585f829';
    $api_url = "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$api_key&units=metric";
    $response = file_get_contents($api_url);

    // Cache the API response in the database
    $sql = "INSERT INTO weather_cache (city, data) VALUES ('$city', '$response')";
    $conn->query($sql);

    echo $response;
}

// Close the database connection
$conn->close();

?>