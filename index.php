<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>WebApp MongoDB</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>WebApp MongoDB</h1>
        <form action="index.php" method="POST">
            <label for="query">Inserisci la tua query MongoDB:</label>
            <input type="text" id="query" name="query" placeholder='{"nome": "valore"}'>
            <button type="submit">Esegui Query</button>
        </form>

        <div class="results">
            <h2>Risultati:</h2>
            <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                require 'queries.php';
                $query = $_POST['query'];
                $results = executeQuery($query);

                if ($results) {
                    foreach ($results as $document) {
                        echo "<pre>" . json_encode($document, JSON_PRETTY_PRINT) . "</pre>";
                    }
                } else {
                    echo "<p>Nessun risultato trovato.</p>";
                }
            }
            ?>
        </div>
    </div>
</body>
</html>
