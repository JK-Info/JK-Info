const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD');

// PUT request to update the menu
router.put('/putCardapio', (req, res) => {
    console.log('rota put cardapio chamada');
  
    const { diaSemana, prato, sobremesa } = req.body;

    // Verifique se prato é um array
    if (!Array.isArray(prato)) {
        return res.status(400).json({ message: 'O campo "prato" deve ser um array' });
    }
  
    try { 
        const query = 'UPDATE Cardapio SET prato = ?, sobremesa = ? WHERE diaSemana = ?';
        db.query(query, [prato.join(', '), sobremesa, diaSemana], (error, result) => {
            if (error) {
                console.error('Erro ao atualizar o cardápio:', error);
                console.log('Erro ao atualizar o cardapio:', error);
                return res.status(500).json({ message: 'Erro ao atualizar o cardápio. Tente novamente' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Dia da semana não encontrado no cardápio.' });
            }

            res.status(200).json({ message: 'Cardápio atualizado com sucesso.' });
        });
    } catch (error) {
        console.error('Erro ao atualizar o cardápio:', error);
        console.log('Erro ao atualizar o cardapio2:', error);
        res.status(500).json({ message: 'Erro ao atualizar o cardápio. Tente novamente' });
    }
});

// GET request to retrieve the menu
router.get('/getCardapio', (req, res) => {
    console.log('rota get cardapio chamada');

    try {
        const query = 'SELECT * FROM Cardapio ORDER BY diaSemana';
        db.query(query, (error, result) => {
            if (error) {
                console.error('Erro ao obter cardápio:', error);
                return res.status(500).json({ message: 'Erro ao obter o cardápio. Tente novamente.' });
            }

            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Cardápio não encontrado' });
            }
        });
    } catch (error) {
        console.error('Erro ao obter cardápio:', error);
        res.status(500).json({ message: 'Erro ao obter o cardápio. Tente novamente.' });
    }
});

module.exports = router;
