<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contactos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Preparar y vincular
$stmt = $conn->prepare("INSERT INTO contacto (nombre, email, mensaje) VALUES ('$nombre','$email', '$mensaje')");
$stmt->bind_param("sss", $nombre, $email, $mensaje);

// Establecer parámetros y ejecutar
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];
$stmt->execute();

echo "Mensaje enviado con éxito";

$stmt->close();
$conn->close();
?>
