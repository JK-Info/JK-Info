const express = require('express');
const cors = require('cors');
const RotaLogin = require('./RotaLogin'); // Certifique-se de que o caminho está correto

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

// Adiciona as rotas de login
app.use('/', RotaLogin);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
