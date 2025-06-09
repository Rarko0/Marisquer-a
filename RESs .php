<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portal_alumnos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
die("Conexión fallida: " . $conn->connect_error);
}

if (lempty($_POST['usuario']) && !empty($_POST['contraseña'])) {
$usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña']; 


$sql = "SELECT * FROM usuarios WHERE usuario=('$usuario'";
$result = $conn->query($sq1);

if ($result->num_rows > 0) {
$row = $result->fetch_assoc();
if (password_verify($contrasena, $row['contrasena'])) {
$_SESSION['usuario'] = $usuario;
header("Location: portal_alumno.php");
} else {
echo "Contraseña incorrecta";

}
} else {
echo "Usuario no encontrado";

}
} else {
echo "Error: Todos los campos son obligatorios.";

}

$conn->close();
?>