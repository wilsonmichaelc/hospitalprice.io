<?php
// TODO: Cleanup and add some data checks
include("../hpio.php");

$data = json_decode(file_get_contents('php://input'), true);
$hospital = $data["hospital"];
$search = join(" + ", $data["search"]);
$search = "{$search}%";

$mysqli = new mysqli($host, $user, $pass, $db) or die('There was a problem connecting to the database');
unset($host, $user, $pass, $db);

$myArray = array();
$stmt = $mysqli->prepare("
    SELECT h.npi_number, p.price, c.short_description, c.long_description FROM cpt_hcpcs c
    JOIN prices p ON p.code = c.code
    JOIN hospitals h ON h.npi_number = p.npi_number
    WHERE MATCH(short_description) AGAINST(? IN BOOLEAN MODE)
    AND p.npi_number = ?
");


$stmt->bind_param("ss", $search, $hospital);

$stmt->execute();

$result = $stmt->get_result();

$output = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($output);

$result->close();
$mysqli->close();

?>
