const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão

const router = express.Router();

// Rota de Login
router.post('/login', async (req, res) => {
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

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    res.status(200).json({ success: true, userType: user.tipoUsuario });
  });
});

// Rota para Definir Senha
router.post('/set-password', async (req, res) => {
  console.log('Rota de definir senha chamada:', req.body);
  const { email, senha } = req.body;

  const hashedPassword = await bcrypt.hash(senha, 10);
  
  const query = 'UPDATE ContatoInstitucional SET senha = ? WHERE emailInstitucional  = ?';
  db.query(query, [hashedPassword, email], (err, results) => {
    if (err) {
      console.error('Erro ao definir a senha:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'E-mail não encontrado' });
    }

    res.status(200).json({ success: true, message: 'Senha definida com sucesso!' });
  });
});

module.exports = router; // Exporta as rotas
