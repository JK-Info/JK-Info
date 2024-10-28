const express = require('express');
const routerPerfil = express.router();
const db = require('../ConexaoBD/conexaoBD'); 

router.get('/perfil/idPessoa', (req, res) => {
    const idPessoa = req.params.idPessoa;

    const Query = 'SELECT p.idPessoa, p.nome, p.dataNascimento, p.sexo, p.RG, p.CPF, ci.emailInstitucional, ci.tipoUsuario FROM mydb.Pessoa p join mydb.ContatoInstitucional ci ON p.ContatoInstitucional_idContatoInstitucional = ci.idContatoInstitucional';
    db.query(Query,[idPessoa], (err, result) => {
        if (err){
            return res.status(500).send({message: 'erro ao buscar informações do perfil', error: err });
        }
        if (result.length > 0) {
            res.send(result[0]);
        }else{
            res.status(404).send({message: 'Perfil Não encontrado'});
        }
    });
});

module.exports = routerPerfil;