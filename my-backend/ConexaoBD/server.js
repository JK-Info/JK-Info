const express = require('express');
const cors = require('cors');
const RotaLogin = require('./RotaLogin'); // Rota de login
const RotaPublicacao = require('../Rotas/RotaPublicacao'); // Rota de publicações

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

// Adiciona as rotas
app.use('/', RotaLogin); // Rota de login
app.use('/', RotaPublicacao); // Rota de publicações

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});