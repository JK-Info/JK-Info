import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const NotasGestao = () => {
  const [notas, setNotas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [nota, setNota] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/notas')
      .then((response) => response.json())
      .then((data) =>{ 
        console.log(data);
        setNotas(data);
      })
      .catch((error) => console.error('Erro ao buscar notas:', error));
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
    fetch(`http://localhost:3000/notas/${item.idNota}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nota: item.nota }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotas(notas.map((nota) => (nota.idNota === item.idNota ? data : nota)));
      })
      .catch((error) => console.error('Erro ao editar nota:', error));
  };

  const handleDeleteNota = (item) => {
    fetch(`http://localhost:3000/notas/${item.idNota}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setNotas(notas.filter((nota) => nota.idNota !== item.idNota));
      })
      .catch((error) => console.error('Erro ao excluir nota:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>
      <FlatList
        data={notas}
        renderItem={({ item }) => (
          <View style={styles.notaContainer}>
            <Text style={styles.nota}>{item.nota}</Text>
            <Text style={styles.turma}>{item.Turma?.nomeTurma}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => handleEditNota(item)} />
              <Button title="Excluir" onPress={() => handleDeleteNota(item)} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.idNota.toString()}
      />
      <TextInput
        placeholder="Digite a nota"
        value={nota}
        onChangeText={(text) => setNota(text)}
        style={styles.input}
      />
      <Button title="Enviar" onPress={handleSendNota} />
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