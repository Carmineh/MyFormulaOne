<?php
require 'config.php';

function executeQuery($query) {
    try {
        $client = getMongoClient();
        $collection = $client->nomeDatabase->nomeCollezione; // Cambia nomeDatabase e nomeCollezione

        $queryArray = json_decode($query, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Query JSON non valida");
        }

        $results = $collection->find($queryArray);
        return $results;
    } catch (Exception $e) {
        echo "<p>Errore: " . $e->getMessage() . "</p>";
        return null;
    }
}
?>
