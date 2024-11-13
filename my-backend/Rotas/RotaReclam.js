const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão

// Rota para visualizar todas as reclamações de um usuário específico (idPessoa = 21)
router.get('/reclamacoes/:idPessoa', (req, res) => {
    const idPessoa = req.params.idPessoa;
    const query = `SELECT * FROM Reclamacao_Enviada WHERE Pessoa_idPessoa = ?`;
    db.query(query, [idPessoa], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao buscar reclamações' });
        return;
      }
      res.status(200).json(results);
    });
  });
  
  // Rota para responder uma reclamação
  router.post('/responder', (req, res) => {
    const { idReclamacao, resposta } = req.body;
    const query = `UPDATE Reclamacao_Enviada SET resposta = ? WHERE idReclamacao = ?`;
    db.query(query, [resposta, idReclamacao], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao responder reclamação' });
        return;
      }
      res.status(200).json({ message: 'Resposta enviada com sucesso!' });
    });
  });
  
  // Rota para excluir uma reclamação
  router.delete('/excluir/:idReclamacao', (req, res) => {
    const { idReclamacao } = req.params;
    const query = `DELETE FROM Reclamacao_Enviada WHERE idReclamacao = ?`;
    db.query(query, [idReclamacao], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao excluir reclamação' });
        return;
      }
      res.status(200).json({ message: 'Reclamação excluída com sucesso!' });
    });
  });

  module.exports = router;