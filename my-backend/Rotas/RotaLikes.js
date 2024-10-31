const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão

router.post('/like', async (req, res) => {
    const { idPublicacao, liked, userId } = req.body; // Certifique-se de passar userId no corpo da requisição

    console.log(`Rota /likes chamada com idPublicacao: ${idPublicacao} e liked: ${liked}`);

    try {
        if (liked) {
            // Verifica se o usuário já curtiu a publicação
            const [existingLike] = await db.query('SELECT * FROM Likes WHERE idPublicacao = ? AND userId = ?', [idPublicacao, userId]);

            if (existingLike.length === 0) {
                // Se não existir, insere o like
                await db.query('INSERT INTO Likes (idPublicacao, userId) VALUES (?, ?)', [idPublicacao, userId]);
            }
        } else {
            // Remove o like se já existir
            await db.query('DELETE FROM Likes WHERE idPublicacao = ? AND userId = ?', [idPublicacao, userId]);
        }

        // Retorna a nova contagem de likes
        const [result] = await db.query('SELECT COUNT(*) as newCount FROM Likes WHERE idPublicacao = ?', [idPublicacao]);
        res.json({ newCount: result[0].newCount });
    } catch (error) {
        console.error('Erro ao processar o like:', error);
        res.status(500).json({ message: 'Erro ao processar o like' });
    }
});

module.exports = router;
