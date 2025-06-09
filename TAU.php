<?php
// Parámetros de conexión
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'mariscos_db';

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['error' => 'Error de conexión: ' . $conn->connect_error]));
}

// Consulta para obtener el menú de mariscos
$sql = "SELECT id, nombre, descripcion, precio, tipo FROM menu"; // Asegúrate de que 'tipo' esté en tu tabla
$result = $conn->query($sql);

$menuItems = [
    'platillos' => [],
    'cocteles' => [],
    'sopas' => []
];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $menuItems[$row['tipo']][] = $row; // Agrupar por tipo
    }
}

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($menuItems);

// Cerrar conexión
$conn->close();
?>
