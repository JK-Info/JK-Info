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

// Função para lidar com as queries de forma assíncrona usando Promises
const dbQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Rota para buscar os dados do aluno logado (nome e RM)
routerTurmasAlunos.get('/alunoLogado', async (req, res) => {
    try {
        // Obtém o ID da pessoa a partir do token
        const idPessoa = getIdFromToken(req);

        // Query para buscar o nome e RM do aluno
        const query = `
            SELECT 
                Pessoa.nome AS NomeAluno,
                Aluno.rm AS RMAluno
            FROM 
                Pessoa
            JOIN Aluno ON Aluno.Pessoa_idPessoa = Pessoa.idPessoa
            WHERE 
                Pessoa.idPessoa = ?;
        `;

        // Executa a query no banco de dados
        const results = await dbQuery(query, [idPessoa]);

        // Verifica se encontrou o aluno
        if (results.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        // Retorna os dados do aluno
        const { NomeAluno, RMAluno } = results[0];
        res.json({ nomeAluno: NomeAluno, rmAluno: RMAluno });

    } catch (error) {
        console.error('[ERRO] Falha ao buscar dados do aluno logado:', error);
        res.status(500).json({ message: 'Erro ao buscar dados do aluno' });
    }
});


// Rota para buscar os alunos da turma
routerTurmasAlunos.get('/alunosTurma', async (req, res) => {
    try {
        const idPessoa = getIdFromToken(req);

        const query = `
  SELECT
    Turma.nomeTurma,
    Pessoa.nome AS NomeAluno
FROM
    Turma
JOIN Aluno_has_Turma ON Aluno_has_Turma.Turma_idTurma = Turma.idTurma
JOIN Aluno ON Aluno.idAluno = Aluno_has_Turma.Aluno_idAluno
JOIN Pessoa ON Pessoa.idPessoa = Aluno.Pessoa_idPessoa
WHERE
    Turma.idTurma = (
        SELECT Turma_idTurma 
        FROM Aluno_has_Turma
        JOIN Aluno ON Aluno.idAluno = Aluno_has_Turma.Aluno_idAluno
        WHERE Aluno.Pessoa_idPessoa = ?
    );


        `;
        const results = await dbQuery(query, [idPessoa]);
        res.json(results);
    } catch (error) {
        console.error(`[ERRO] Falha ao buscar alunos da turma: ${error}`);
        res.status(500).json({ message: 'Erro ao buscar alunos da turma' });
    }
});

// Rota para buscar os professores da turma
routerTurmasAlunos.get('/professoresTurma', async (req, res) => {
    try {
        const idPessoa = getIdFromToken(req);

        const query = `
            SELECT
                Turma.nomeTurma,
                Pessoa.nome AS NomeProfessor
            FROM
                Turma
            JOIN Materia ON Materia.Turma_idTurma = Turma.idTurma
            JOIN Materia_has_Professor ON Materia_has_Professor.Materia_idMateria = Materia.idMateria
            JOIN Professor ON Professor.idProfessor = Materia_has_Professor.Professor_idProfessor
            JOIN Pessoa ON Pessoa.idPessoa = Professor.Pessoa_idPessoa
            WHERE
                Turma.idTurma = (
                    SELECT Turma_idTurma
                    FROM Aluno
                    WHERE Pessoa_idPessoa = ?
                );
        `;
        const results = await dbQuery(query, [idPessoa]);
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar professores da turma:', error);
        res.status(500).json({ message: 'Erro ao buscar professores da turma' });
    }
});

// Rota para buscar as notas da turma
routerTurmasAlunos.get('/notasTurma', async (req, res) => {
    try {
        const idPessoa = getIdFromToken(req);

        const query = `
            SELECT
    Turma.nomeTurma,
    Notas.nota,
    Notas.descricao,
    Notas.dataCriacao
FROM
    Turma
JOIN Notas ON Notas.Turma_idTurma = Turma.idTurma
WHERE
    Turma.idTurma = (
        SELECT Turma_idTurma
        FROM Aluno_has_Turma
        JOIN Aluno ON Aluno.idAluno = Aluno_has_Turma.Aluno_idAluno
        WHERE Aluno.Pessoa_idPessoa = ?
    );

        `;
        const results = await dbQuery(query, [idPessoa]);
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar notas da turma:', error);
        res.status(500).json({ message: 'Erro ao buscar notas' });
    }
});

module.exports = routerTurmasAlunos;
