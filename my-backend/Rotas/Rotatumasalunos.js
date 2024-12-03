const express = require('express');
const db = require('../ConexaoBD/conexaoBD'); // Importa a conexão
const routerTurmasAlunos = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;

function getIdFromToken(req) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token não fornecido.');
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.userId;
}

routerTurmasAlunos.get('/alunosTurma', async (req, res) => {
    try {
        const idPessoa = getIdFromToken(req);

        const query = `
            SELECT 
                Pessoa.nome AS NomeAluno, 
                Pessoa.email AS EmailAluno
            FROM 
                Turma
            JOIN Aluno ON Aluno.Turma_idTurma = Turma.idTurma
            JOIN Pessoa ON Pessoa.idPessoa = Aluno.Pessoa_idPessoa
            WHERE 
                Turma.idTurma = (
                    SELECT Turma_idTurma 
                    FROM Aluno 
                    WHERE Pessoa_idPessoa = ?
                );
        `;
        db.query(query, [idPessoa], (err, results) => {
            if (err) {
                console.error(`[ERRO] Falha ao buscar alunos da turma: ${err}`);
                return res.status(500).json({ message: 'Erro ao buscar alunos da turma' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error(`[ERRO] Token inválido: ${error}`);
        res.status(401).json({ message: 'Token inválido.' });
    }
});

routerTurmasAlunos.get('/professoresTurma', async (req, res) => {
    try {
        const idPessoa = getIdFromToken(req);

        const query = `
            SELECT Pessoa.nome AS nome, Pessoa.email
            FROM Professor
            JOIN Pessoa ON Professor.Pessoa_idPessoa = Pessoa.idPessoa
            WHERE Professor.Turma_idTurma = (
                SELECT Turma_idTurma
                FROM Aluno
                WHERE Pessoa_idPessoa = ?
            );
        `;
        db.query(query, [idPessoa], (err, results) => {
            if (err) {
                console.error('Erro ao buscar professores da turma:', err);
                return res.status(500).json({ message: 'Erro ao buscar professores da turma' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Erro ao buscar professores da turma:', error);
        res.status(500).json({ message: 'Erro interno' });
    }
});

routerTurmasAlunos.get('/notasTurma', async (req, res) => {
    try {
        const idPessoa = getIdFromToken(req);

        const query = `
            SELECT 
                nota.nota AS conteudo, 
                nota.data_criacao AS dataCriacao, 
                Pessoa.nome AS professor
            FROM 
                nota
            JOIN professor ON nota.professor_id = professor.id
            JOIN pessoa ON professor.pessoa_id = pessoa.idPessoa
            WHERE 
                nota.turma_id = (
                    SELECT turma_id
                    FROM aluno
                    WHERE pessoa_id = ?
                )
            ORDER BY nota.data_criacao DESC;
        `;
        db.query(query, [idPessoa], (err, results) => {
            if (err) {
                console.error('Erro ao buscar notas:', err);
                return res.status(500).json({ message: 'Erro ao buscar notas' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Erro ao buscar notas:', error);
        res.status(500).json({ message: 'Erro interno' });
    }
});


module.exports = routerTurmasAlunos;