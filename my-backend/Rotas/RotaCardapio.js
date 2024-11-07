const express = require('express');
const router = express.Router();
const db = require('../ConexaoBD/conexaoBD');

router.put('/putCardapio', () => {
    const { carboidratos, proteina, complemento, sobremesa } = req

    try {
        const query = 'UPDATE cardapio SET (carboidratos, proteina, complemento, sobremesa) = (?, ?, ?, ?) WHERE diaSemana = true';

        db.query(query, [carboidratos, proteina, complemento, sobremesa]);
    }

    catch (error) {
        console.error('Erro ao atualizar cardápio', error);
    }
});

router.get('/getCardapio', () => {
    const {}

    try {

    }
    catch {

    }
});

module.exports = router;