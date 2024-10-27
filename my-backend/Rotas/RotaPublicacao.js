const express = require('express');
const router = express.Router(); // Cria uma instância do roteador
const db = require('./conexaoBD'); 

// Rota para buscar publicações
router.get('/publicacoes', (req, res) => {
  const query = 'SELECT * FROM Publicacao'; // Ajuste conforme necessário

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar publicações:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    
    res.status(200).json(results);
  });
});


module.exports = router;
