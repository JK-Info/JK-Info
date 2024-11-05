const express = require('express');
const routerNotas = express.Router();
const db = require('../ConexaoBD/conexaoBD');

routerNotas.get('/getturmasnotas', (req, res) => {
    const nome = req.query.nome; // Recebe o parâmetro de filtro pela query string
    console.log(`Rota /get turmasNotas chamada com o nome: ${nome}`); // Log da chamada

    let query = 'SELECT * FROM Turma';
    
    if (nome) {
        query += ' WHERE nomeTurma LIKE ?'; // Filtra turmas pelo nome
    }
    
    db.query(query, [`%${nome}%`], (err, results) => {
        if (err) {
            console.error('Erro ao buscar turmas:', err); // Log de erro
            res.status(500).json({ error: 'Erro ao buscar turmas.' });
        } else {
            console.log('Resultados das turmas:', results); // Log dos resultados
            res.json(results);
        }
    });
});

routerNotas.get('/getalunosnotas', (req, res) => {
    const { turma } = req.query; // Recebe a turma da query string
    console.log(`Rota /get alunosNotas chamada com a turma: ${turma}`); // Log da chamada

    // Consulta para buscar os alunos de acordo com a turma escolhida
    let query = `
      SELECT 
        p.nome AS NomeAluno, 
        MIN(ci.emailInstitucional) AS EmailInstitucional
      FROM 
        mydb.Aluno a
      JOIN 
        mydb.Pessoa p ON a.Pessoa_idPessoa = p.idPessoa
      JOIN 
        mydb.Aluno_has_Turma at ON a.idAluno = at.Aluno_idAluno
      JOIN 
        mydb.Turma t ON at.Turma_idTurma = t.idTurma
      JOIN 
        mydb.Contato c ON p.idPessoa = c.Pessoa_idPessoa
      JOIN 
        mydb.ContatoInstitucional ci ON c.Pessoa_idPessoa = p.idPessoa
      WHERE 
        t.idTurma IS NOT NULL
    `;

    const params = [];

    if (turma) {
        query += ' AND t.nomeTurma = ?'; // Filtrar pela turma escolhida (use nomeTurma se for o nome)
        params.push(turma);
    }

    query += ' GROUP BY p.nome'; // Agrupamos pelo nome do aluno para evitar duplicações

    db.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar alunos.' });
            console.error('Erro ao buscar alunos:', err);
        } else {
            console.log('Resultados dos alunos:', results); // Log dos resultados
            res.json(results);
        }
    });
});

routerNotas.post('/adcnotas',async (req, res) => {
    const {idAluno, nota} = req.body;

    if(!idAluno || nota === undefined){
        return res.status(400).json({message: 'Parametros Invalidos. Certifique-se de que alunoId e nota estão presentes'})
    }

    const query = `
        INSERT INTO mydb.Notas (Aluno_idAluno, nota)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE nota = VALUES(nota);
    `;

    try {
        await db.execute(query, [idAluno, nota]);
        res.status(200).json({ message: 'Nota adicionada ou atualizada com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar nota:', error);
        res.status(500).json({ message: 'Erro ao adicionar nota', error });
    }

});

module.exports = routerNotas;
