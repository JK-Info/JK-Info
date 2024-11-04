const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão

// Rota para adicionar comentário
router.post('/postcomentario', (req, res) => {
    const { text, Publicacao_idPublicacao } = req.body; // Não pega Pessoa_id do body
    const Pessoa_id = 21; // Define o ID fixo da pessoa como 21

    // Verifica se os campos obrigatórios estão presentes
    if (!text || !Publicacao_idPublicacao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const query = 'INSERT INTO Comentario (texto, Publicacao_idPublicacao, Pessoa_idPessoa) VALUES (?, ?, ?)';
        
        // Usa o ID fixo (21) ao invés de pegar o Pessoa_id do body
        db.query(query, [text, Publicacao_idPublicacao, Pessoa_id]); 
        
        res.status(201).json({ message: 'Comentário adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ error: 'Erro ao adicionar comentário.' });
    }
});


// Rota para obter comentários de uma publicação específica
router.get('/getcomentarios/:idPublicacao', (req, res) => {
    const idPublicacao = req.params.idPublicacao; // ID dinâmico da publicação
    console.log(`Rota GET /getcomentarios chamada para a publicação com ID ${idPublicacao}`);

    const query = `
        SELECT 
            c.idComentario,
            c.texto,
            pes.idPessoa AS id_comentador,  -- Adiciona o ID da pessoa que comentou
            pes.nome AS nome_comentador,
            COUNT(cc.idCurtidaComentario) AS num_likes
        FROM 
            Comentario c
        JOIN 
            Pessoa pes ON c.Pessoa_idPessoa = pes.idPessoa
        LEFT JOIN 
            CurtidaComentario cc ON c.idComentario = cc.Comentario_idComentario
        WHERE 
            c.Publicacao_idPublicacao = ?
        GROUP BY 
            c.idComentario, pes.idPessoa, pes.nome  -- Inclui idPessoa no GROUP BY
        ORDER BY 
            c.idComentario;
    `;

    // Usando callback para fazer a query
    db.query(query, [idPublicacao], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar comentários:', err);
            return res.status(500).json({ message: 'Erro ao buscar comentários.' });
        }
    
        console.log('Dados retornados da query:', rows); // Adicione este log para ver o que está vindo
    
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum comentário encontrado para essa publicação.' });
        }
    
        res.json(rows);
    });
});

// Rota para adicionar ou remover curtida em comentário
router.post('/likecomentario', (req, res) => {
    const { idComentario, liked, userId } = req.body;

    console.log(`Rota /likecomentario chamada com idComentario: ${idComentario} e liked: ${liked}`);

    if (!idComentario || !userId) {
        return res.status(400).json({ message: 'idComentario e userId são obrigatórios.' });
    }

    // Lógica para adicionar ou remover a curtida no comentário
    if (liked) {
        // Verifica se o usuário já curtiu o comentário
        const checkLikeQuery = 'SELECT * FROM CurtidaComentario WHERE Comentario_idComentario = ? AND userId = ?';
        db.query(checkLikeQuery, [idComentario, userId], (err, results) => {
            if (err) {
                console.error('Erro ao verificar like no comentário:', err);
                return res.status(500).json({ message: 'Erro ao verificar like no comentário.' });
            }

            if (results.length === 0) {
                // Se não existir, insere o like
                const insertLikeQuery = 'INSERT INTO CurtidaComentario (Comentario_idComentario, userId) VALUES (?, ?)';
                db.query(insertLikeQuery, [idComentario, userId], (err) => {
                    if (err) {
                        console.error('Erro ao inserir like no comentário:', err);
                        return res.status(500).json({ message: 'Erro ao inserir like no comentário.' });
                    }
                    // Retorna a nova contagem de likes no comentário
                    getCommentLikeCount(idComentario, res);
                });
            } else {
                // Curtida já existe, retorna contagem atual
                getCommentLikeCount(idComentario, res);
            }
        });
    } else {
        // Remove o like se já existir
        const deleteLikeQuery = 'DELETE FROM CurtidaComentario WHERE Comentario_idComentario = ? AND userId = ?';
        db.query(deleteLikeQuery, [idComentario, userId], (err) => {
            if (err) {
                console.error('Erro ao remover like no comentário:', err);
                return res.status(500).json({ message: 'Erro ao remover like no comentário.' });
            }
            // Retorna a nova contagem de likes no comentário
            getCommentLikeCount(idComentario, res);
        });
    }
});

// Função para buscar a contagem de likes de um comentário
const getCommentLikeCount = (idComentario, res) => {
    const countQuery = 'SELECT COUNT(*) AS numLikes FROM CurtidaComentario WHERE Comentario_idComentario = ?';
    db.query(countQuery, [idComentario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar contagem de likes do comentário:', err);
            return res.status(500).json({ message: 'Erro ao buscar contagem de likes do comentário.' });
        }
        const numLikes = results[0].numLikes;
        res.json({ numLikes });
    });
};

module.exports = router;
