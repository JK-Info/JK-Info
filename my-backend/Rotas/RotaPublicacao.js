const express = require('express');
const routerPubli = express.Router();
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão
const { body, validationResult } = require('express-validator'); // Para validação

// Rota para buscar todas as publicações com comentários
routerPubli.get('/getpublicacao', (req, res) => {
  console.log('Rota GET /getpublicacao chamada'); // Log quando a rota é chamada
  const query = `
    SELECT 
        p.idPublicacao,
        p.descricao AS publicacao_descricao,
        p.imagem AS publicacao_imagem,
        p.dataPublicacao,
        c.idComentario,
        c.texto AS comentario_texto,
        c.dataComentario,
        c.Pessoa_idPessoa AS comentario_pessoa_id
    FROM 
        Publicacao p
    LEFT JOIN 
        Comentario c ON p.idPublicacao = c.Publicacao_idPublicacao
    ORDER BY 
        p.dataPublicacao DESC;
  `;

  db.query(query, (error, results) => {
      if (error) {
          console.error('Erro ao buscar publicações:', error); // Log de erro
          return res.status(500).json({ success: false, error: 'Erro ao buscar publicações.' });
      }
      
      console.log('Publicações buscadas com sucesso:', results.length); // Log de sucesso
      if (results.length > 0) {
          console.log('Conteúdo das publicações:', results); // Log do conteúdo das publicações
      } else {
          console.log('Nenhuma publicação encontrada.'); // Log se não houver publicações
      }

      res.json({ success: true, data: results });
  });
});

// Rota para criar nova publicação
routerPubli.post('/postpublicacoes', [
  body('descricao').notEmpty().withMessage('Descrição é obrigatória.'),
  body('Pessoa_idPessoa').notEmpty().withMessage('ID da pessoa é obrigatório.')
], (req, res) => {
  console.log('Rota POST /postpublicacao chamada com body:', req.body); // Log quando a rota é chamada

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.error('Erros de validação:', errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { descricao, imagem = null, Pessoa_idPessoa } = req.body; // Define imagem como null se não for fornecida
  const query = 'INSERT INTO Publicacao (descricao, imagem, Pessoa_idPessoa) VALUES (?, ?, ?)';
  
  db.query(query, [descricao, imagem, Pessoa_idPessoa], (error, results) => {
      if (error) {
          console.error('Erro ao criar publicação:', error); // Log de erro
          return res.status(500).json({ success: false, error: 'Erro ao criar publicação.' });
      }
      
      console.log('Publicação criada com sucesso, ID:', results.insertId); // Log de sucesso
      res.status(201).json({ success: true, idPublicacao: results.insertId });
  });
});

// Rota para excluir uma publicação
routerPubli.delete('/deletepublicacao/:id', (req, res) => {
  const id = req.params.id;

  // Verifica se o ID é um número
  if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'ID deve ser um número.' });
  }

  console.log('Rota DELETE /deletepublicacao chamada para id:', id); // Log quando a rota é chamada
  const query = 'DELETE FROM Publicacao WHERE idPublicacao = ?';
  
  db.query(query, [id], (error, results) => {
      if (error) {
          console.error('Erro ao excluir publicação:', error); // Log de erro
          return res.status(500).json({ success: false, error: 'Erro ao excluir publicação.' });
      }

      if (results.affectedRows === 0) {
          console.warn('Nenhuma publicação encontrada para o ID:', id);
          return res.status(404).json({ success: false, error: 'Publicação não encontrada.' });
      }

      console.log('Publicação excluída com sucesso, ID:', id); // Log de sucesso
      res.status(200).json({ success: true, message: 'Publicação excluída com sucesso.' });
  });
});

module.exports = routerPubli;  
