const express = require('express');
const cors = require('cors');
const RotaLogin = require('../Rotas/RotaLogin'); // Rota de login
const RotaPublicacao = require('../Rotas/RotaPublicacao'); // Rota de publicações
const RotaFiltrarTurma = require('../Rotas/RotaFIltrarTurma');
const routerPerfil = require('../Rotas/RotaPerfil');
const RotaLikes = require('../Rotas/RotaLikes');
const RotaComentarios = require('../Rotas/RotaComentarios');
const RotaBuscaUsuario = require('../Rotas/RotaBuscaUsuario');
const routerNotas = require('../Rotas/RotaNotas');
const RotaCardapio = require('../Rotas/RotaCardapio');
//const RotaNotas = require('../Rotas/RotaNotas');

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

// Adiciona as rotas
app.use('/', RotaLogin); // Rota de login
app.use('/', RotaPublicacao); // Rota de publicações
app.use('/', RotaFiltrarTurma);
app.use('/', routerPerfil);
app.use('/', RotaLikes);
app.use('/', RotaComentarios);
app.use('/', RotaBuscaUsuario);
app.use('/', routerNotas);
app.use('/', RotaCardapio);
//app.use('/', RotaNotas);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});