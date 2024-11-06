import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const NotasGetao = () => {
  const [notasData, setNotasData] = useState([]);
  const [novaNota, setNovaNota] = useState('');
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    getTurmas();
    getNotas();
  }, []);

  const getTurmas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getturmasnotas'); // Link atualizado
      setTurmas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getNotas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getnotasturma', { // Link atualizado
        params: { turmaId: turmaSelecionada },
      });
      setNotasData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendNota = async () => {
    if (!novaNota || !turmaSelecionada) {
      Alert.alert('Erro', 'Por favor, selecione uma turma e escreva uma nota.');
      return;
    }

    try {
      if (isEditing) {
        await axios.put('http://localhost:3000/adcnotas', { // Link atualizado
          idNota: currentId,
          nota: novaNota,
        });
      } else {
        await axios.post('http://localhost:3000/adcnotas', { // Link atualizado
          idTurma: turmaSelecionada,
          nota: novaNota,
        });
      }
      getNotas();
      resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNota = async (notaId) => {
    try {
      await axios.delete('http://localhost:3000/deletenota', { // Link atualizado
        params: { notaId },
      });
      getNotas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditNota = async (item) => {
    setTurmaSelecionada(item.Turma_idTurma);
    setNovaNota(item.nota);
    setCurrentId(item.idNota);
    setIsEditing(true);
  };

  const resetFields = () => {
    setNovaNota('');
    setTurmaSelecionada('');
    setModalVisible(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  const renderNotaItem = ({ item }) => (
    <View style={styles.notaContainer}>
      <Text style={styles.turma}>{item.Turma_idTurma}</Text>
      <Text style={styles.nota}>{item.nota}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditNota(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteNota(item.idNota)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas Enviadas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a nota..."
        value={novaNota}
        onChangeText={setNovaNota}
      />
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={styles.turmaSelecionada}>{turmaSelecionada || 'Selecione a turma'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sendButton} onPress={handleSendNota}>
        <Text style={styles.buttonText}>{isEditing ? 'Atualizar Nota' : 'Enviar Nota'}</Text>
      </TouchableOpacity>
      <FlatList
        data={notasData}
        renderItem={renderNotaItem}
        keyExtractor={item => item.idNota.toString()}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Selecionar Turma</Text>
            <ScrollView>
              {turmas.map((turma, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.turmaButton}
                  onPress={() => {
                    setTurmaSelecionada(turma.idTurma);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textoTurma}>{turma.nomeTurma}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
  turmaSelecionada: {
    fontSize: 16,
    color: '#555',
  },
  sendButton: {
    backgroundColor: '#ff6400',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
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
  turma: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nota: {
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#00527C',
    padding: 10,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#ff6400',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#dddddd',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  turmaButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoTurma: {
    fontSize: 16,
    color: '#333',
  },
  botaoFechar: {
    backgroundColor: '#ff6400',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  textoBotaoFechar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotasGetao;
