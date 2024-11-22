const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD');

// PUT request to update the menu
router.put('/putCardapio', (req, res) => {
    console.log('Rota PUT /putCardapio chamada');

    const { id_dia, prato1, prato2, prato3, prato4, sobremesa } = req.body;

    // Validação dos dados recebidos
    if (!id_dia || !prato1) {
        return res.status(400).json({ 
            message: 'Os campos "id_dia" e "prato1" são obrigatórios.' 
        });
    }

    try { 
        // Atualiza os pratos individualmente no banco de dados
        const query = `
            UPDATE Cardapio 
            SET prato1 = ?, prato2 = ?, prato3 = ?, prato4 = ?, sobremesa = ? 
            WHERE id_dia = ?`;

        db.query(query, [prato1, prato2 || '', prato3 || '', prato4 || '', sobremesa || '', id_dia], (error, result) => {
            if (error) {
                console.error('Erro ao atualizar o cardápio:', error);
                return res.status(500).json({ 
                    message: 'Erro ao atualizar o cardápio. Tente novamente mais tarde.' 
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ 
                    message: `O cardápio para o dia com ID "${id_dia}" não foi encontrado.` 
                });
            }

            res.status(200).json({ 
                message: 'Cardápio atualizado com sucesso.' 
            });
        });
    } catch (error) {
        console.error('Erro inesperado ao atualizar o cardápio:', error);
        res.status(500).json({ 
            message: 'Erro inesperado. Tente novamente mais tarde.' 
        });
    }
});

// GET request to retrieve the menu
router.get('/getCardapio', (req, res) => {
    console.log('Rota GET /getCardapio chamada');

    try {
        const query = 'SELECT * FROM Cardapio ORDER BY id_dia';

        db.query(query, (error, result) => {
            if (error) {
                console.error('Erro ao obter o cardápio:', error);
                return res.status(500).json({ 
                    message: 'Erro ao obter o cardápio. Tente novamente mais tarde.' 
                });
            }

            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ 
                    message: 'Nenhum cardápio encontrado.' 
                });
            }
        });
    } catch (error) {
        console.error('Erro inesperado ao obter o cardápio:', error);
        res.status(500).json({ 
            message: 'Erro inesperado. Tente novamente mais tarde.' 
        });
    }
});

module.exports = router;
