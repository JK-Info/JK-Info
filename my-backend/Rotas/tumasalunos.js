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

// Rota para buscar os alunos, professores e notas de uma turma
routerTurmasAlunos.get('/turma/:idTurma', async (req, res) => {
    const turmaId = req.params.idTurma;

    try {
        // Buscar alunos e notas da turma
        const queryAlunosNotas = `
            SELECT a.nomeAluno, a.rmAluno, n.nota, t.nomeTurma
            FROM Aluno a
            JOIN Aluno_has_Turma at ON a.idAluno = at.idAluno
            JOIN Turma t ON at.idTurma = t.idTurma
            LEFT JOIN Nota n ON t.idTurma = n.idTurma
            WHERE t.idTurma = ?;
        `;

        const queryProfessores = `
            SELECT p.nomeProfessor
            FROM Professor p
            JOIN Professor_has_Turma pt ON p.idProfessor = pt.idProfessor
            JOIN Turma t ON pt.idTurma = t.idTurma
            WHERE t.idTurma = ?;
        `;

        const queryOutrosAlunos = `
            SELECT a.nomeAluno, a.rmAluno
            FROM Aluno a
            JOIN Aluno_has_Turma at ON a.idAluno = at.idAluno
            WHERE at.idTurma = ?;
        `;

        // Executar as queries em paralelo
        const [alunosNotas, professores, outrosAlunos] = await Promise.all([
            db.query(queryAlunosNotas, [turmaId]),
            db.query(queryProfessores, [turmaId]),
            db.query(queryOutrosAlunos, [turmaId]),
        ]);

        res.json({
            alunosNotas,
            professores,
            outrosAlunos
        });
    } catch (error) {
        console.error('Erro ao buscar dados da turma:', error);
        res.status(500).json({ message: 'Erro interno ao buscar dados da turma' });
    }
});

// Rota para buscar os alunos da turma
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

// Rota para buscar os professores da turma
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

// Rota para buscar as notas da turma
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
