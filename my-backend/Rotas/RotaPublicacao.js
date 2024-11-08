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
router.post(
  '/postpublicacao',
  [
    body('descricao').notEmpty().withMessage('A descrição é obrigatória.'),
    body('Pessoa_idPessoa').isInt().withMessage('ID da pessoa deve ser um número inteiro.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Erros de validação:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Extrai os dados do corpo da requisição
    const { descricao, imagem, Pessoa_idPessoa } = req.body;
    console.log('Recebendo dados para criar publicação:', { descricao, imagem, Pessoa_idPessoa });

    try {
      // Insere a nova publicação no banco de dados
      const query = `
        INSERT INTO Publicacao (descricao, imagem, Pessoa_idPessoa)
        VALUES (?, ?, ?)
      `;
      const values = [descricao, imagem || null, Pessoa_idPessoa];

      // Executa a query para inserir a publicação no banco de dados
      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Erro ao inserir publicação no banco de dados:', err);
          return res.status(500).json({ message: 'Erro ao criar a publicação.' });
        }

        console.log('Publicação criada com sucesso, ID:', result.insertId);

        // Resposta de sucesso com o ID da nova publicação
        res.status(201).json({
          message: 'Publicação criada com sucesso!',
          publicacaoId: result.insertId
        });
      });
    } catch (error) {
      console.error('Erro no servidor:', error);
      res.status(500).json({ message: 'Erro no servidor ao criar a publicação.' });
    }
  }
);

// Rota DELETE para excluir uma publicação
router.delete('/deletepublicacao/:id', (req, res) => {
  const { id } = req.params;

  console.log(`Rota DELETE /deletepublicacao chamada para excluir a publicação com id: ${id}`);

  // Verificar se há curtidas na publicação
  const checkLikesQuery = 'SELECT * FROM CurtidaPublicacao WHERE Publicacao_idPublicacao = ?';
  db.query(checkLikesQuery, [id], (err, result) => {
    if (err) {
      console.error('Erro ao verificar curtidas:', err);
      return res.status(500).json({ message: 'Erro ao verificar curtidas.' });
    }

    console.log(`Verificação de curtidas para a publicação ${id} retornou:`, result);

    if (result.length > 0) {
      console.log(`A publicação ${id} possui curtidas associadas. Não pode ser excluída.`);
      return res.status(400).json({ message: 'Não é possível excluir a publicação, pois há curtidas associadas.' });
    }

    console.log(`Nenhuma curtida associada encontrada para a publicação ${id}. Prosseguindo com a exclusão.`);

    // Agora excluir a publicação
    const deletePostQuery = 'DELETE FROM Publicacao WHERE idPublicacao = ?';
    db.query(deletePostQuery, [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir a publicação:', err);
        return res.status(500).json({ message: 'Erro ao excluir publicação.' });
      }

      console.log(`Resultado da exclusão da publicação ${id}:`, result);

      if (result.affectedRows > 0) {
        console.log(`Publicação ${id} excluída com sucesso.`);
        return res.status(200).json({ message: 'Publicação excluída com sucesso.' });
      } else {
        console.log(`Publicação ${id} não encontrada.`);
        return res.status(404).json({ message: 'Publicação não encontrada.' });
      }
    });
  });
});

module.exports = router;
