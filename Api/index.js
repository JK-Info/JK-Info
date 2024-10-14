const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySql:', err );
        return;
    }else {
        console.log('Conexao Bem Sucedida!');
    }
});

// Simulando um banco de dados com um array:
let users = [];

// Rota para obter todos os usuários:
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const correctPassword = 'senha123';

    if (password !== correctPassword) {
        return res.status(401).json({ message: 'Senha inválida!' });
    }

    // Consulta SQL para verificar se o usuário existe
    const query = 'SELECT * FROM contatoinstitucional WHERE emailInstituicional = ?';
    db.query([email], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // Email encontrado
            res.json({ user: email });
        } else {
            // Email não encontrado
            res.status(404).json({ message: 'Email não encontrado!' });
        }
    });
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Rota para login
