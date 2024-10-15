const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configurações de conexão
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: '', 
  database: 'mydb', 
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados');
  });
  app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    console.log("Email recebido:", email); 
  
    const query = 'SELECT * FROM ContatoInstitucional WHERE emailInstituicional = ?';
  
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Erro na consulta:', err); 
        return res.status(500).json({ error: 'Erro no servidor' });
      }
  
      console.log("Resultados da consulta:", results); 
  
      if (results.length > 0) {
        const user = results[0];
        res.status(200).json({ message: 'Login bem-sucedido', user : results[0]});
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    });
  });
  
  
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
