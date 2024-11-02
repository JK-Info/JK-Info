const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão

// Rota para adicionar comentário
router.post('/postcomentario', async (req, res) => {
    const { text, Publicacao_idPublicacao, Pessoa_id } = req.body; // Ajuste aqui para obter os nomes corretos
    if (!text || !Publicacao_idPublicacao || !Pessoa_id) {

        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

      try {
    const query = 'INSERT INTO Comentario (texto, Publicacao_idPublicacao, Pessoa_id) VALUES (?, ?, ?)';
    await db.query(query, [text, Publicacao_idPublicacao, Pessoa_id]); // Insira os dados no banco de dados
    res.status(201).json({ message: 'Comentário adicionado com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    res.status(500).json({ error: 'Erro ao adicionar comentário.' });
  }
});

// Rota para obter comentários de uma publicação específica
router.get('/comentarios/:idPublicacao', (req, res) => {
    const idPublicacao = req.params.idPublicacao; // Pega o ID da publicação da URL

    // Log da requisição
    console.log('Recebendo requisição para obter comentários da publicação:', idPublicacao);

    const query = `
        SELECT 
            c.idComentario, 
            c.texto AS comentario_texto,
            p.nome AS nome_autor,
            pub.descricao AS publicacao_descricao,
            IFNULL(COUNT(l.idCurtidaComentario), 0) AS numero_likes
        FROM 
            Comentario c
        JOIN 
            Pessoa p ON c.Pessoa_idPessoa = p.idPessoa  
        JOIN 
            Publicacao pub ON c.Publicacao_idPublicacao = pub.idPublicacao
        LEFT JOIN 
            CurtidaComentario l ON c.idComentario = l.Comentario_idComentario
        WHERE 
            c.Publicacao_idPublicacao = ?  -- Usar ? para prevenir SQL injection
        GROUP BY 
            c.idComentario, p.nome, pub.descricao
        ORDER BY 
            c.dataComentario DESC;
    `;

    db.query(query, [idPublicacao], (error, results) => {
        if (error) {
            console.error('Erro ao buscar comentários:', error);
            return res.status(500).json({ success: false, message: 'Erro ao buscar comentários.' });
        }

        console.log('Comentários encontrados para a publicação:', idPublicacao, results);
        res.json({ success: true, data: results });
    });
}); 

module.exports = router;
