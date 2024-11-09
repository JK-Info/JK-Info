import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Picker } from 'react-native';

const NotasGestao = () => {
  const [notas, setNotas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [nota, setNota] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [notaEditar, setNotaEditar] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/turmas')
      .then((response) => response.json())
      .then((data) => setTurmas(data))
      .catch((error) => console.error('Erro ao buscar turmas:', error));

    fetch('http://localhost:3000/notas')
      .then((response) => response.json())
      .then((data) => setNotas(data))
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
      body: JSON.stringify({ nota, turmaId: turmaSelecionada }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotas(notas.map((nota) => (nota.idNota === item.idNota ? data : nota)));
        setNota('');
        setEditando(false);
      })
      .catch((error) => console.error('Erro ao editar nota:', error));
  };

  const handleDeleteNota = (nota) => {
    fetch(`http://localhost:3000/notas/${nota.idNota}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setNotas(notas.filter((nota) => nota.idNota !== nota.idNota));
      })
      .catch((error) => console.error('Erro ao excluir nota:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione a Turma:</Text>
      <Picker
        selectedValue={turmaSelecionada}
        onValueChange={(itemValue) => setTurmaSelecionada(itemValue)}
        style={styles.picker}
      >
        {turmas.map((turma) => (
          <Picker.Item label={turma.nomeTurma} value={turma.idTurma} key={turma.idTurma} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Digite a Nota"
        value={nota}
        onChangeText={(text) => setNota(text)}
        keyboardType="numeric"
      />

      {editando ? (
        <Button title="Editar" onPress={() => handleEditNota(notaEditar)} />
      ) : (
        <Button title="Enviar" onPress={handleSendNota} />
      )}

      <Text style={styles.subtitle}>Notas:</Text>
      <FlatList
        data={notas}
        renderItem={({ item }) => (
          <View style={styles.notaContainer} key={item.idNota}>
            <Text style={styles.nota}>
              {item.nota} - Turma {item.Turma.idTurma}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Editar"
                onPress={() => {
                  setEditando(true);
                  setNotaEditar(item);
                  setNota(item.nota);
                  setTurmaSelecionada(item.Turma.idTurma);
                }}
              />
              <Button title="Excluir" onPress={() => handleDeleteNota(item)} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.idNota.toString()}
      />
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 15,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    height: 50,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  notaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  nota: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NotasGestao;
