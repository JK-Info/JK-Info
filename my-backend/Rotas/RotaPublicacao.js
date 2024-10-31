const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão

// Rota para buscar todas as publicações com comentários
router.get('/getpublicacao', async (req, res) => {
    console.log('Rota GET /getpublicacao chamada');
  
    const query = `
      SELECT 
          p.idPublicacao,
          p.descricao AS publicacao_descricao,
          pes.nome AS nome_pessoa,
          c.nomeCargo AS cargo,
          p.dataPublicacao,
          COUNT(DISTINCT cur.idCurtidaPublicacao) AS quantidade_likes,
          COUNT(DISTINCT com.idComentario) AS quantidade_comentarios
      FROM 
          Publicacao p
      JOIN 
          Pessoa pes ON p.Pessoa_idPessoa = pes.idPessoa
      JOIN 
          Funcionario f ON pes.idPessoa = f.Pessoa_idPessoa
      JOIN 
          Cargo c ON f.Cargo_idCargo = c.idCargo
      LEFT JOIN 
          CurtidaPublicacao cur ON p.idPublicacao = cur.Publicacao_idPublicacao
      LEFT JOIN 
          Comentario com ON p.idPublicacao = com.Publicacao_idPublicacao
      GROUP BY 
          p.idPublicacao, pes.nome, c.nomeCargo, p.dataPublicacao
      ORDER BY 
          p.dataPublicacao DESC
      LIMIT 0, 1000;
    `;
  
    try {
      const [results] = await db.promise().query(query);
      console.log('Publicações buscadas com sucesso:', results.length);
      res.json({ success: true, data: results });
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
      res.status(500).json({ success: false, error: 'Erro ao buscar publicações.' });
    }
  });   

// Rota para criar nova publicação
router.post('/postpublicacoes', [
  body('descricao').notEmpty().withMessage('Descrição é obrigatória.'),
  body('Pessoa_idPessoa').notEmpty().withMessage('ID da pessoa é obrigatório.')
], async (req, res) => {
  console.log('Rota POST /postpublicacao chamada com body:', req.body); // Log quando a rota é chamada

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.error('Erros de validação:', errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { descricao, imagem = null, Pessoa_idPessoa } = req.body; // Define imagem como null se não for fornecida
  const query = 'INSERT INTO Publicacao (descricao, imagem, Pessoa_idPessoa) VALUES (?, ?, ?)';

  try {
      const results = await db.query(query, [descricao, imagem, Pessoa_idPessoa]);
      console.log('Publicação criada com sucesso, ID:', results.insertId); // Log de sucesso
      res.status(201).json({ success: true, idPublicacao: results.insertId });
  } catch (error) {
      console.error('Erro ao criar publicação:', error); // Log de erro
      res.status(500).json({ success: false, error: 'Erro ao criar publicação.' });
  }
});

// Rota para excluir uma publicação
router.delete('/deletepublicacao/:id', async (req, res) => {
  const id = req.params.id;

  // Verifica se o ID é um número
  if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'ID deve ser um número.' });
  }

  console.log('Rota DELETE /deletepublicacao chamada para id:', id); // Log quando a rota é chamada
  const query = 'DELETE FROM Publicacao WHERE idPublicacao = ?';

  try {
      const results = await db.query(query, [id]);
      if (results.affectedRows === 0) {
          console.warn('Nenhuma publicação encontrada para o ID:', id);
          return res.status(404).json({ success: false, error: 'Publicação não encontrada.' });
      }

      console.log('Publicação excluída com sucesso, ID:', id); // Log de sucesso
      res.status(200).json({ success: true, message: 'Publicação excluída com sucesso.' });
  } catch (error) {
      console.error('Erro ao excluir publicação:', error); // Log de erro
      res.status(500).json({ success: false, error: 'Erro ao excluir publicação.' });
  }
});

module.exports = router;
