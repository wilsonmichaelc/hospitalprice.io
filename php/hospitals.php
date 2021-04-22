<?php
// TODO: cleanup and add some checks
include("../hpio.php");

$mysqli = new mysqli($host, $user, $pass, $db) or die('There was a problem connecting to the database');
unset($host, $user, $pass, $db);

$myArray = array();
$stmt = $mysqli->prepare("SELECT * FROM hospitals WHERE city LIKE ?");

$city = htmlspecialchars($_GET["city"]);
$search = "{$city}%";
$stmt->bind_param("s", $search);

$stmt->execute();

$result = $stmt->get_result();

$output = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($output);

$result->close();
$mysqli->close();

?>
