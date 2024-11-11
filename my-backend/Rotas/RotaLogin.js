const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../ConexaoBD/conexaoBD');
const jwt = require('jsonwebtoken');
const routerLogin = express.Router();

// A variável de ambiente já foi carregada no server.js
// Então não precisa chamar dotenv aqui, apenas acessar process.env.JWT_SECRET_KEY

// Rota de Login
routerLogin.post('/login', async (req, res) => {
  console.log('Rota de login chamada:', req.body);
  const { email, senha } = req.body;

  const query = 'SELECT * FROM ContatoInstitucional WHERE emailInstitucional = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'E-mail não encontrado' });
    }

    const user = results[0];

    if (!user.senha) {
      return res.status(400).json({ success: false, message: 'Usuário ainda não definiu uma senha.' });
    }

    // Usando try-catch para capturar erros durante a comparação das senhas
    let isPasswordValid;
    try {
      isPasswordValid = await bcrypt.compare(senha, user.senha);
    } catch (error) {
      console.error('Erro ao comparar senhas:', error);
      return res.status(500).json({ error: 'Erro ao verificar senha' });
    }

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    // Gerar o token JWT após validar a senha
    const jwtSecret = process.env.JWT_SECRET_KEY; // Agora pode acessar a variável de ambiente
    if (!jwtSecret) {
      console.error('Erro: JWT_SECRET_KEY não encontrada no arquivo .env');
      return res.status(500).json({ error: 'JWT secret não definida' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Resposta com o token e o tipo de usuário
    res.status(200).json({
      success: true,
      token: token,
      userType: user.tipoUsuario, // Retorna o tipo de usuário
      userName: user.nome // Retorna o nome do usuário (opcional)
    });
  });
});
// Rota para Definir Senha
routerLogin.post('/set-password', async (req, res) => {
  console.log('Rota de definir senha chamada:', req.body);
  const { email, senha } = req.body;

  const queryCheck = 'SELECT * FROM ContatoInstitucional WHERE emailInstitucional = ?';
  db.query(queryCheck, [email], async (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'E-mail não encontrado' });
    }

    if (results[0].senha) {
      return res.status(400).json({ success: false, message: 'Senha já definida.' });
    }

    // Se não houver senha, prosseguir com o processo de hash e atualização
    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = 'UPDATE ContatoInstitucional SET senha = ? WHERE emailInstitucional  = ?';
    db.query(query, [hashedPassword, email], (err, results) => {
      if (err) {
        console.error('Erro ao definir a senha:', err);
        return res.status(500).json({ error: 'Erro no servidor' });
      }

      res.status(200).json({ success: true, message: 'Senha definida com sucesso!' });
    });
  });
});

module.exports = routerLogin; // Exporta as rotas 
