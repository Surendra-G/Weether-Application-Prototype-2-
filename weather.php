<?php
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "weather_surendragiri"; // Your database name

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$city = $data->city;
$temperature = $data->data->main->temp;
$humidity = $data->data->main->humidity;
$pressure = $data->data->main->pressure;
$wind = $data->data->wind->speed;
$description = $data->data->weather[0]->description;

$sql = "INSERT INTO weather_data_surendragiri (city, date, temperature, humidity, pressure, wind, description)
        VALUES ('$city', NOW(), '$temperature', '$humidity', '$pressure', '$wind', '$description')";

if ($conn->query($sql) === TRUE) {
    echo "Data saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
