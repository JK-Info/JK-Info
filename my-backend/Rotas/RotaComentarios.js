const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão

// Rota para adicionar comentário
router.post('/postcomentario', async (req, res) => {
    const { idPublicacao, text, idPessoa } = req.body; // Adicionando idPessoa
    try {
        if (!idPublicacao || !text || !idPessoa) {
            return res.status(400).json({ error: 'ID da publicação, texto e ID da pessoa são obrigatórios' });
        }

        const query = 'INSERT INTO Comentario (Publicacao_idPublicacao, texto, Pessoa_idPessoa) VALUES (?, ?, ?)';
        await db.query(query, [idPublicacao, text, idPessoa]);
        
        res.status(201).json({ message: 'Comentário adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ error: 'Erro ao adicionar comentário' });
    }
});

// Rota para obter comentários de uma publicação específica
router.get('/comentarios/:idPublicacao', async (req, res) => {
    const idPublicacao = req.params.idPublicacao;

    const sql = `
        SELECT 
            c.idComentario, 
            c.texto AS comentario_texto,
            p.nome AS nome_autor,
            pub.descricao AS publicacao_descricao,
            COUNT(l.idCurtida) AS numero_likes
        FROM 
            Comentario c
        JOIN 
            Pessoa p ON c.Pessoa_idPessoa = p.idPessoa  
        JOIN 
            Publicacao pub ON c.Publicacao_idPublicacao = pub.idPublicacao
        LEFT JOIN 
            CurtidasComentario l ON c.idComentario = l.idComentario
        WHERE 
            c.Publicacao_idPublicacao = ?
        GROUP BY 
            c.idComentario, p.nome, pub.descricao
        ORDER BY 
            c.dataComentario DESC
        LIMIT 0, 1000;
    `;

    try {
        const results = await db.query(sql, [idPublicacao]);
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        res.status(500).json({ error: 'Erro ao buscar comentários.' });
    }
});

module.exports = router;