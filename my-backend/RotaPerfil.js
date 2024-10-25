const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./conexaoBD'); 

router.get('/perfil/idPessoa', (req, res) => {
    const idPessoa = req.params.idPessoa;

    const Query = 'SELECT P.nome, CI.emailInstitucional, C.emailPessoal, A.Rm FROM Pessoa P INNER JOIN ContatoInstitucional CI on P.ContatoInstitucional_ContatoInstitucional = idContatoInstitucional LEFT JOIN Contato C on P.idPessoa = C.Pessoa_idPessoa LEFT JOIN Aluno A ON P.idPessoa = A.Pessoa_idPessoa'
})