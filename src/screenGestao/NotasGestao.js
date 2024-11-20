import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

const NotasGestao = () => {
  const [notas, setNotas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [nota, setNota] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [notaEditar, setNotaEditar] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/turmas')
        .then((response) => response.json())
        .then((data) => {
          setTurmas(data);
        })
        .catch((error) => {
          setError('Erro ao Carregar Turmas');
        }),

      fetch('http://localhost:3000/notas')
        .then((response) => response.json())
        .then((data) => {
          setNotas(data);
        })
        .catch((error) => {
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
        setNotas((prevNotas) => [...prevNotas, data]);
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
        setNotas((prevNotas) =>
          prevNotas.map((n) => (n.idNota === item.idNota ? data : n))
        );
        setNota('');
        setNotaEditar({});
        setEditando(false);
      })
      .catch((error) => console.error('Erro ao editar nota:', error));
  };

  const handleDeleteNota = (item) => {
    fetch(`http://localhost:3000/notas/${item.idNota}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNotas((prevNotas) => prevNotas.filter((n) => n.idNota !== item.idNota));
      })
      .catch((error) => console.error('Erro ao excluir nota:', error));
  };

  const handleSelectTurma = (turmaId) => {
    setTurmaSelecionada(turmaId);
    setModalVisible(false); // Fechar o modal após a seleção
  };

  if (isLoading) {
    return <Text>Carregando Dados...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a Turma:</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerButtonText}>
          {turmaSelecionada ? `Turma Selecionada: ${turmaSelecionada}` : 'Selecione a turma'}
        </Text>
      </TouchableOpacity>

      {/* Modal para selecionar turma */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecionar Turma</Text>
            <ScrollView style={styles.turmaScroll}>
              <TouchableOpacity
                style={styles.turmaButton}
                onPress={() => {
                  setTurmaSelecionada('Todas');
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textoTurma}>Todas as Turmas</Text>
              </TouchableOpacity>
              {turmas.map((turma) => (
                <TouchableOpacity
                  key={turma.idTurma}
                  style={styles.turmaButton}
                  onPress={() => {
                    setTurmaSelecionada(turma.nomeTurma);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textoTurma}>{turma.nomeTurma}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.botaoFecharModal} onPress={() => setModalVisible(false)}>
              <Text style={styles.textoBotaoFecharModal}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.inputAviso}
        placeholder="Digite o Aviso"
        value={nota}
        onChangeText={(text) => setNota(text)}
        keyboardType="default"
      />

      {editando ? (
        <TouchableOpacity style={styles.buttonEnviarAviso} onPress={() => handleEditNota(notaEditar)}>
          <Text style={styles.buttonText}>Salvar Edição</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonEnviarAviso} onPress={handleSendNota}>
          <Text style={styles.buttonText}>Adicionar Aviso</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subtitle}>Lembretes Enviados:</Text>

      <FlatList
        data={notas.filter((nota) => nota && nota.idNota && nota.nota && nota.Turma_idTurma)}
        renderItem={({ item }) => (
          <View style={styles.notaContainer}>
            <Text style={styles.nota}>
              Lembretes: {item.nota} - Turma {item.Turma_idTurma}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonEnviar}
                onPress={() => {
                  setEditando(true);
                  setNotaEditar(item);
                  setNota(item.nota);
                  setTurmaSelecionada(item.Turma_idTurma);
                }}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonExcluir} onPress={() => handleDeleteNota(item)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
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
  label: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  pickerButton: {
    backgroundColor: '#ff6400',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    height: '80%',
    backgroundColor: '#dddddd',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  turmaScroll: {
    maxHeight: 300,
    width: '100%',
  },
  turmaButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  textoTurma: {
    fontSize: 16,
    color: '#333',
  },
  inputAviso: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: 5
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
    marginVertical: 15,
  },
  notaContainer: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  nota: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonEnviarAviso:{
    backgroundColor: '#00527C',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center'
  },
  buttonEnviar: {
    backgroundColor: '#00527C',
    padding: 10,
    borderRadius: 5,
    marginTop: 35,
    alignItems: 'center'
  },
  buttonExcluir: {
    backgroundColor: '#ff6400',
    padding: 10,
    borderRadius: 5,
    marginTop: 35,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  botaoFecharModal: {
    backgroundColor: '#ff6400',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoFecharModal: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotasGestao;
