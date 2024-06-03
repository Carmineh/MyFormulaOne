<?php
require 'vendor/autoload.php'; // Assicurati di avere Composer e la libreria MongoDB per PHP

function getMongoClient() {
    $uri = "mongodb://localhost:27017"; // Cambia l'URI in base alla tua configurazione
    $client = new MongoDB\Client($uri);
    return $client;
}
?>
