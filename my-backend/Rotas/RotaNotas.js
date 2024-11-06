const express = require('express');
const routerNotas = express.Router();
const db = require('../ConexaoBD/conexaoBD');

// Rota para obter turmas com notas associadas
routerNotas.get('/getturmasnotas', (req, res) => {
  const nome = req.query.nome;
  let query = 'SELECT * FROM turma';

  if (nome) {
    query += ' WHERE nomeTurma LIKE ?';
  }

  db.query(query, [`%${nome}%`], (err, results) => {
    if (err) {
      console.error('Erro ao buscar turmas:', err);
      return res.status(500).json({ error: 'Erro ao buscar turmas.' });
    }
    res.json(results);
  });
});

// Rota para obter notas de uma turma específica
routerNotas.get('/getnotasturma', (req, res) => {
  const { turmaId } = req.query;

  if (!turmaId) {
    return res.status(400).json({ error: 'Parâmetro turmaId é necessário' });
  }

  db.query('SELECT * FROM Notas WHERE Turma_idTurma = ?', [turmaId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar notas.' });
    }
    res.json(results);
  });
});

// Rota para adicionar ou atualizar nota para uma turma
routerNotas.post('/adcnotas', (req, res) => {
  const { idTurma, idNota, nota } = req.body;

  if (!idTurma || !nota) {
    return res.status(400).json({ error: 'idTurma e nota são necessários.' });
  }

  // Verifica se o idTurma é um número válido
  if (isNaN(idTurma) || isNaN(nota)) {
    return res.status(400).json({ error: 'idTurma e nota devem ser números válidos.' });
  }

  if (idNota) {
    // Atualiza a nota existente
    const updateQuery = `
      UPDATE Notas
      SET nota = ?
      WHERE idNota = ?
    `;
    db.query(updateQuery, [nota, idNota], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar nota:', err);
        return res.status(500).json({ error: 'Erro ao atualizar nota' });
      }
      res.json({ message: 'Nota atualizada com sucesso' });
    });
  } else {
    // Adiciona uma nova nota
    const insertQuery = `
      INSERT INTO Notas (Turma_idTurma, nota)
      VALUES (?, ?)
    `;
    db.query(insertQuery, [idTurma, nota], (err, result) => {
      if (err) {
        console.error('Erro ao adicionar nota:', err);
        return res.status(500).json({ error: 'Erro ao adicionar nota' });
      }
      res.json({ message: 'Nota adicionada com sucesso' });
    });
  }
});

// Rota para excluir uma nota
routerNotas.delete('/deletenota', (req, res) => {
  const { notaId } = req.query;

  if (!notaId) {
    return res.status(400).json({ error: 'Parâmetro notaId é necessário' });
  }

  db.query('DELETE FROM Notas WHERE idNota = ?', [notaId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir nota.' });
    }
    res.json({ message: 'Nota excluída com sucesso.' });
  });
});

module.exports = routerNotas;
