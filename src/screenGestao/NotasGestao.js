import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const NotasGestao = () => {
  const [notas, setNotas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [nota, setNota] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [notaEditar, setNotaEditar] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
    fetch('http://localhost:3000/turmas')
      .then((response) => response.json())
      .then((data) => {
        console.log('Turmas:', data);
        setTurmas(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar turmas:', error);
        setError('Erro ao Carregar Turmas');
      }),
  
    fetch('http://localhost:3000/notas')
      .then((response) => response.json())
      .then((data) => {
        console.log('Notas:', data);
        setNotas(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar notas:', error);
        setError('Erro ao Carregar Notas');
      }),

    ]).finally(() => setIsLoading(false)); 
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
        if (data.idNota && data.nota) {
          setNotas(notas.map((n) =>
            n.idNota === item.idNota ? data : n
          ));
        }else{
          console.error('Erro: Dados inválidos retornados pela API', data);
        };
        setNota('');
        setNotaEditar({});
        setEditando(false);
      })
      .catch((error) => console.error('Erro ao editar lembretes:', error));
  };

  const handleDeleteNota = (item) => {
    fetch(`http://localhost:3000/notas/${item.idNota}`, {
      method: 'DELETE',
    })
      .then(() => {
        const notasAtualizadas = notas.filter((n) => n.idNota !== item.idNota);
        setNotas(notasAtualizadas);
      })
      .catch((error) => console.error('Erro ao excluir lembretes:', error));
  };

  if(isLoading) {
    return <Text>Carregando Dados...</Text>
}

  if (error) {
    return <Text>{error}</Text>
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Lembretes/Avisos</Text>

      <Text style={styles.label}>Selecione a Turma:</Text>
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
        placeholder="Digite o Aviso"
        value={nota}
        onChangeText={(text) => setNota(text)}
        keyboardType="numeric"
      />

      {editando ? (
        <Button title="Salvar Edição" onPress={() => handleEditNota(notaEditar)} />
      ) : (
        <Button title="Adicionar Aviso" onPress={handleSendNota} />
      )}

      <Text style={styles.subtitle}>Lembretes Cadastradas:</Text>
      <FlatList
        data={notas.filter(nota => nota && nota.idNota && nota.nota && nota.Turma_idTurma)}
        renderItem={({ item }) => (
          <View style={styles.notaContainer}>
            <Text style={styles.nota}>
              Lembretes: {item.nota} - Turma {item.Turma_idTurma}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Editar"
                onPress={() => {
                  setEditando(true);
                  setNotaEditar(item);
                  setNota(item.nota);
                  setTurmaSelecionada(item.Turma_idTurma);
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
    marginVertical: 15,
  },
  notaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nota: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export default NotasGestao;
