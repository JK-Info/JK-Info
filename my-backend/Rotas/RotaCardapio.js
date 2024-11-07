const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD');

// PUT request to update the menu
router.put('/putCardapio', (req, res) => {
    // Destructuring values from the request body
    const { carboidratos, proteina, complemento, sobremesa } = req.body; // Assuming you're sending the data in the request body

    try {
        const query = 'UPDATE cardapio SET carboidratos = ?, proteina = ?, complemento = ?, sobremesa = ? WHERE diaSemana = true';

        // Execute the query with the provided values
        db.query(query, [carboidratos, proteina, complemento, sobremesa], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar cardápio', err);
                return res.status(500).send('Erro ao atualizar cardápio');
            }
            res.status(200).send('Cardápio atualizado com sucesso');
        });
    } catch (error) {
        console.error('Erro ao atualizar cardápio', error);
        res.status(500).send('Erro ao atualizar cardápio');
    }
});

// GET request to retrieve the menu (not yet implemented)
router.get('/getCardapio', (req, res) => {
    try {
        const query = 'SELECT * FROM cardapio WHERE diaSemana = true';
        
        db.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar cardápio', err);
                return res.status(500).send('Erro ao buscar cardápio');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Erro ao buscar cardápio', error);
        res.status(500).send('Erro ao buscar cardápio');
    }
});

module.exports = router;
