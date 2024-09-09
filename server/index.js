const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors")

// Middleware para manejar datos JSON
app.use(express.json());
app.use(cors());


// Crear la conexión a la base de datos
const dataBase = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todo"
});

// Rutas
app.get('/list', (req, res) => {
    dataBase.query('SELECT * FROM lista', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/update', (req, res) => {
    const id = req.body.id;
    dataBase.query('UPDATE lista SET estatus = 1 WHERE id_tarea = ?', [id], (err, result) => {
        if (err) throw err;
        res.send("La tarea se actualizó con éxito");
    });
});

app.post('/create', (req, res) => {
    const { nombre_tarea, contexto } = req.body;
    dataBase.query('INSERT INTO lista (nombre_tarea, contexto) VALUES (?, ?)', [nombre_tarea, contexto], (err, result) => {
        if (err) throw err;
        res.send("La tarea se creó con éxito");
    });
});

// Alojamos un servidor en el puerto 3001
app.listen(3001, () => {
    console.log("El servidor se alojó en el puerto http://localhost:3001");
});
