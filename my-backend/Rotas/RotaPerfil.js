const express = require('express');
const routerPerfil = express.Router();
const db = require('../ConexaoBD/conexaoBD');

routerPerfil.get('/perfil/:idPessoa', (req, res) => {
    const idPessoa = req.params.idPessoa;
    console.log(`[INFO] Iniciando busca do perfil para idPessoa: ${idPessoa}`);

    const Query = `
        SELECT p.idPessoa, p.nome, p.dataNascimento, p.sexo, p.RG, p.CPF, ci.emailInstitucional, ci.tipoUsuario 
        FROM mydb.Pessoa p 
        JOIN mydb.ContatoInstitucional ci ON p.ContatoInstitucional_idContatoInstitucional = ci.idContatoInstitucional 
        WHERE p.idPessoa = ?
    `;

    db.query(Query, [idPessoa], (err, result) => {
        if (err) {
            console.error(`[ERRO] Falha ao buscar informações do perfil:`, err);
            return res.status(500).send({
                message: 'Erro ao buscar informações do perfil',
                error: err
            });
        }

        console.log(`[INFO] Resultado da consulta:`, result); 

        if (result.length > 0) {
            console.log(`[INFO] Perfil encontrado:`, result[0]);
            res.send(result[0]);
        } else {
            console.warn(`[AVISO] Nenhum perfil encontrado para idPessoa: ${idPessoa}`);
            res.status(404).send({
                message: 'Perfil Não encontrado'
            });
        }
    });
});

routerPerfil.get('/test', (req, res) => {
    console.log(`[INFO] Requisição recebida: ${req.method} para ${req.url}`);
    res.send('Rota de teste do perfil funcionando!');
});


routerPerfil.put('/perfil/:idPessoa', (req, res) => {
    const idPessoa = req.params.idPessoa;
    const { emailPessoal, numeroCelular } = req.body;

    // Verifica se emailPessoal foi fornecido
    if (!emailPessoal || !numeroCelular) {
        return res.status(400).send({ message: 'Email e Numero de Celular pessoal é obrigatório.' });
    }

    // Primeiro, tenta inserir o email pessoal
    const insertQuery = `
        INSERT INTO Contato (emailPessoal, numeroCelular, Pessoa_idPessoa) VALUES (?, ?)
    `;

    db.query(insertQuery, [emailPessoal, numeroCelular, idPessoa], (err, result) => {
        if (err) {
            console.error(`[ERRO] Falha ao inserir informações do perfil:`, err);
            // Se a inserção falhar, podemos tentar uma atualização
            const updateQuery = `
                UPDATE Contato SET emailPessoal = ?, numeroCelular = ? WHERE Pessoa_idPessoa = ?
            `;

            db.query(updateQuery, [emailPessoal, numeroCelular, idPessoa], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error(`[ERRO] Falha ao atualizar informações do perfil:`, updateErr);
                    return res.status(500).send({
                        message: 'Erro ao atualizar informações do perfil',
                        error: updateErr,
                    });
                }
                console.log(`[INFO] Perfil atualizado com sucesso para idPessoa: ${idPessoa}`);
                res.send({ message: 'Perfil atualizado com sucesso!' });
            });
        } else {
            console.log(`[INFO] Perfil inserido com sucesso para idPessoa: ${idPessoa}`);
            res.send({ message: 'Perfil inserido com sucesso!' });
        }
    });
});

// Rota de teste
routerPerfil.get('/test', (req, res) => {
    console.log(`[INFO] Requisição recebida: ${req.method} para ${req.url}`);
    res.send('Rota de teste do perfil funcionando!');
});



module.exports = routerPerfil;
