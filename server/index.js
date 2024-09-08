const express = require("express") // Creamos un objeto de express para inicializar un servidor
const app = express() // asignamos los metodos a la variable de app
const mysql = require("mysql") // Creamos un objeto de mysql para la llamada a la base de datos

// Creamos la conexion a la base de datos
const dataBase = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"todo"
});

app.get('/list', (req, res) => {
    dataBase.query('SELECT * FROM lista', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.post('/update', (req, res) => {
    const id = req.body.id
    dataBase.query('UPDATE lista SET estatus = 1 WHERE id_tarea = ?', id, (err, result) => {
        if (err) throw err
        res.send("La tarea se actualizo con exito")
    })
})

app.post('/create', (req, res) => {
    const contexto = req.body.contexto

    dataBase.query('INSERT INTO lista (contexto) VALUES ?', contexto, (err, result) => {
        if (err) throw err
        res.send("La tarea se creo con exito")
    })
})

// Alojamos un servidor en el puerto 3001
app.listen(3001, () => {
    console.log("El servidor se alojo en el puerto http://localhost:3001")
})