const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD');

// PUT request to update the menu
router.put('/putCardapio', (req, res) => {
   console.log('rota put cardapio chamada');

    const { diaSemana, pratos, complemento, sobremesa } = req.body;

    try {
        const query = 'UPDATE Cardapio SET pratos = ?, complemento = ?, sobremesa = ? WHERE diaSemana = true';

        const  result = db.query(query, [diaSemana, pratos, complemento, sobremesa]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Dia da semana não encontrado no cardápio.' });
        }

        res.status(200).json({ message: 'Cardápio atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar o cardápio:', error);
            res.status(500).json({ message: 'Erro ao atualizar o cardápio. Tente novamente' });
        }
});

router.get('/getCardapio', (req, res) => {
    console.log('rota get cardapio chamada');

    try {
        const query = 'SELECT * FROM Cardapio ORDER BY diaSemana';
        const result = db.query(query);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Cardápio não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao obter cardápio:', error);
        res.status(500).json({ message: 'Erro ao obter o cardápio. Tente novamente.' });
    }
});

module.exports = router;
