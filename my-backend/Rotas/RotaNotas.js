const express = require('express');
const routerNotas = express.Router();
const db = require('../ConexaoBD/conexaoBD');

routerNotas.get('/notas', (req, res)=>{
  const query = 'SELECT * FROM  notas';
  db.query(query, (err, results)=>{
   
    if(err){
      console.error('Erro ao Buscar Notas:', err);
      res.status(500).send({mensagem: 'Erro ao Buscar Notas'});
    }else{
      return res.json(results);
    }
  });
});

routerNotas.post('/notas', (req,res)=>{
  const {nota, turmaId} = req.body;
  const query = 'INSERT INTO notas (nota, Turma_idTurma) VALUES (?,?)';

  db.query(query, [nota, turmaId], (err,results) =>{
    if(err){
      console.error('Erro ao Criar nota:', err);
      res.status(500).send({mensagem: 'Erro ao criar nota'});
    }else{
      res.send({mensagem: 'Nota Criada Cm Sucesso!'});
    }
  });
});

routerNotas.put('/notas/:id', (req,res)=>{
  const {id} = req.params;
  const {nota} = req.body;
  const query = 'UPDATE notas Set nota = ? WHERE idNota = ?';

  db.query(query, [nota, id], (err, results)=> {
    if(err){
      console.error('Erro ao Editar nota:', err);
      res.status(500).send({mensagem: 'Erro ao criar nota'});
    }else{
      res.send({mensagem: 'Nota Editada Cm Sucesso!'});
    }
  });
});

routerNotas.delete('/notas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM notas WHERE idNota = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir nota:', err);
      res.status(500).send({ mensagem: 'Erro ao excluir nota' });
    } else {
      res.send({ mensagem: 'Nota excluída com sucesso!' });
    }
  });
});

routerNotas.get('/turmas', (res,req) =>{
  const query = 'SELECT idTurma, nomeTurma FROM turmas';
  db.query(query, (err,results)=> {
    if(err){
      console.error('Erro ao buscar Turmas', err)
      res.status(500).send({mensagem: 'Erro ao buscar Turmas'});
    }else{
      res.json(results);
    }
  })
})

module.exports = routerNotas;
