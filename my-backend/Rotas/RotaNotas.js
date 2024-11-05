/*const express = require('express');
const routerNotas = express.Router();
const db = require('../ConexaoBD/conexaoBD');

routerNotas.get('/turmas/:turmaID/alunos', async (req, res) => {
    console.log('[INFO] Iniciando Busca do perfil para idAluno: ${rm}');
    const turmaID = req.params.turmaID;

    const Query = ` SELECT 
            a.idAluno, a.RM, p.nome AS Nome
        FROM 
            mydb.Aluno AS a
        JOIN 
            mydb.Pessoa AS p ON a.Pessoa_idPessoa = p.idPessoa
        JOIN 
            mydb.Aluno_has_Turma AS at ON a.idAluno = at.Aluno_idAluno
        WHERE 
            at.Turma_idTurma = ?;`;

            try {
                const [rows] = await db.execute(query, [turmaId]);
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Erro ao buscar alunos da turma', error });
            }    
});

routerNotas.post('/alunos/:idAluno/notas', async (req, res) => {
    const idAluno = req.params.idAluno;
    const { nota } = req.body;
    
    const query = `
        INSERT INTO mydb.Notas (Aluno_idAluno, nota) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE nota = VALUES(nota);
    `;

    try {
        await db.execute(query, [idAluno, nota]);
        res.status(200).json({ message: 'Nota salva com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar a nota', error });
    }
});

    module.exports = router;
    */