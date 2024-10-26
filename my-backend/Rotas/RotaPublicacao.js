const express = require('express');
const routerPerfil = express.router();
const db = require('./conexaoBD'); 

// Rota para criar uma nova publicação
router.post('/', (req, res) => {
  const { descricao, image } = req.body;

  if (!descricao) {
    return res.status(400).json({ error: 'Descrição é obrigatória.' });
  }

  const query = 'INSERT INTO Publicacao (descricao, image, data_criacao) VALUES (?, ?, NOW())';
  db.query(query, [descricao, image], (err, result) => {
    if (err) {
      console.error('Erro ao inserir publicação:', err);
      return res.status(500).json({ error: 'Erro no servidor.' });
    }
    const newPost = {
      id: result.insertId,
      descricao,
      image,
      data_criacao: new Date(),
    };
    res.status(201).json(newPost);
  });
});

// Rota para obter todas as publicações
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Publicacao ORDER BY data_criacao DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar publicações:', err);
      return res.status(500).json({ error: 'Erro no servidor.' });
    }
    res.status(200).json(results);
  });
});

// Rota para deletar uma publicação
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM publicacoes WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar publicação:', err);
      return res.status(500).json({ error: 'Erro no servidor.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Publicação não encontrada.' });
    }

    res.status(200).json({ message: 'Publicação deletada com sucesso.' });
  });
});

module.exports = router;
