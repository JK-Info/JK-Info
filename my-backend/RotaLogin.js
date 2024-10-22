const bcrypt = require('bcrypt');

app.post('/login', async (req, res) => {
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

    // Verifica se o usuário ainda não definiu uma senha
    if (!user.senha) {
      return res.status(400).json({ success: false, message: 'Usuário ainda não definiu uma senha.' });
    }

    // Verifica se a senha fornecida é válida
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    res.status(200).json({ success: true, userType: user.tipoUsuario });
  });
});

app.post('/set-password', async (req, res) => {
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