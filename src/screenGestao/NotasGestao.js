import { text } from 'body-parser';
import { id } from 'date-fns/locale';
import { response } from 'express';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from 'react-native-web';

const NotasGestao = () => {
  const [notas, setNotas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [nota, setNota] = useState('');
  const [turmas, setTurmas] = useState('');
  const [editando, setEditando] = useState(false);
  const [notaEditar, setNotaEditar] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/turmas')
      .then((response) => response.json())
      .then((data) => setTurmas(data))
      .catch((error) => console.error('Erro ao buscar notas:', error));

    fetch('http:localhost:3000/notas')
      .then((response) => response.json())
      .then((data) => setNota(data))
      .catch((error)=> console.error('Erro ao buscar notas:', error));
  }, []);

  const handleSendNota = () => {
    fetch('http://localhost:3000/notas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nota, turmaId: turmaSelecionada }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotas([...notas, data]);
        setNota('');
      })
      .catch((error) => console.error('Erro ao criar nota:', error));
  };

  const handleEditNota = (item) => {
    fetch(`http://localhost:3000/notas/${notaEditar.idNota}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nota, turmaId: turmaSelecionada }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotas(notas.map((nota) => (nota.idNota === notaEditar.idNota ? data : nota)));
        setNota('');
        setEditando(false);
      })
      .catch((error) => console.error('Erro ao editar nota:', error));
  };

  const handleDeleteNota = (item) => {
    fetch(`http://localhost:3000/notas/${item.idNota}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setNotas(notas.filter((nota) => nota.idNota !== id));
      })
      .catch((error) => console.error('Erro ao excluir nota:', error));
  };

  return (
    <View style={styles.container}>
      <Text>Selecione a Turma:</Text>
      <Picker
        selectedValue={turmaSelecionada}
        onValueChange={(itemValue) => setTurmaSelecionada(itemValue)}>
          {turmas.map((turma) => (
            <Picker.item
            label={turma.nomeTurma}
            value={turma.idTurma}
            key={turma.idTurma}/>
            ))}
        </Picker>
        <TextInput
          placeholder="Digite a Nota"
          value={nota}
          onChangeText={(text) => setNota(text)}
        />
        {editando ? (
          <Button title="Editar"
          onPress={handleEditNota} />
        ) : (
          <Button title="Enviar"
          onPress={handleSendNota} />
        )}
        <Text>Notas:</Text>
        {notas.map((nota) => (
          <View key={nota.idNota}>
            <Text>{nota.nota} - {nota.Turma.idTurma}</Text>
            <Button
              title="Editar"
              onPress={() => {
                setEditando(true);
                setNotaEditar(nota);
                setNota(nota.nota);
                setTurmaSelecionada(nota.Turma.idTurma);
              }}
              />
              <Button title="Excluir"
              onPress={() => 
                handleDeleteNota(nota.idNota)} />
                </View>
        ))}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notaContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  nota: {
    fontSize: 16,
    marginVertical: 5,
  },
  turma: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
});

export default NotasGestao;