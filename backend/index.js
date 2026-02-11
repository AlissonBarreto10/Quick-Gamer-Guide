const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

const db = new sqlite3.Database(path.join(__dirname, 'cs2_tutorials.db'), (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados", err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

app.use(express.static(path.join(__dirname, '../frontend')));

// API ANTIGA E SIMPLES: Busca todos os tutoriais de um mapa, ignorando o 'type'
app.get('/api/tutorials/cs2/:map', (req, res) => {
    const map = req.params.map;
    const sql = `SELECT * FROM tutorials WHERE map = ? AND category = 'cs2'`;
    
    db.all(sql, [map], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API para Arc Raiders (mantida)
app.get('/api/tutorials/arc_raiders/:content', (req, res) => {
    const content = req.params.content;
    const sql = `SELECT * FROM tutorials WHERE category = ?`;
    db.all(sql, [content], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}` );
});
