import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Button, Alert, ScrollView } from 'react-native';

const NotasGestao = () => {
  const [notasData, setNotasData] = useState([]);
  const [novaNota, setNovaNota] = useState('');
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const turmas = [
    '1 módulo - Administração - Tarde', 
    '2 módulo - Administração - Tarde', 
    '3 módulo - Administração - Tarde',
    '1 módulo - Desenvolvimento de Sistema - Tarde',
    '2 módulo - Desenvolvimento de Sistema - Tarde',
    '3 módulo - Desenvolvimento de Sistema - Tarde',
    '1 módulo - Logistica - Tarde',
    '2 módulo - Logistica - Tarde',
    '3 módulo - Logistica - Tarde',
    '1 módulo - Administração - Noite', 
    '2 módulo - Administração - Noite', 
    '3 módulo - Administração - Noite',
    '1 módulo - Desenvolvimento de Sistema - Noite',
    '2 módulo - Desenvolvimento de Sistema - Noite',
    '3 módulo - Desenvolvimento de Sistema - Noite',
    '1 módulo - Logistica - Noite',
    '2 módulo - Logistica - Noite',
    '3 módulo - Logistica - Noite',
  ];

  const handleSendNota = () => {
    if (!novaNota || !turmaSelecionada) {
      Alert.alert('Erro', 'Por favor, selecione uma turma e escreva uma nota.');
      return;
    }

    const newNota = {
      id: isEditing ? currentId : (notasData.length + 1).toString(),
      turma: turmaSelecionada,
      nota: novaNota,
    };

    if (isEditing) {
      setNotasData(notasData.map(item => (item.id === currentId ? newNota : item)));
      setIsEditing(false);
    } else {
      setNotasData([...notasData, newNota]);
    }

    resetFields();
  };

  const resetFields = () => {
    setNovaNota('');
    setTurmaSelecionada('');
    setModalVisible(false);
  };

  const handleEditNota = (item) => {
    setTurmaSelecionada(item.turma); // Mantém a turma selecionada
    setNovaNota(item.nota);
    setCurrentId(item.id);
    setIsEditing(true);
  };

  const handleDeleteNota = (id) => {
    setNotasData(notasData.filter(item => item.id !== id));
  };

  const renderNotaItem = ({ item }) => (
    <View style={styles.notaContainer}>
      <Text style={styles.turma}>{item.turma}</Text>
      <Text style={styles.nota}>{item.nota}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditNota(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteNota(item.id)}>
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
        keyExtractor={item => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Selecionar Turma</Text>
            <ScrollView>
              {turmas.map((turma, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.turmaButton}
                  onPress={() => {
                    setTurmaSelecionada(turma);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textoTurma}>{turma}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
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
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  notaContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
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
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
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
    maxHeight: '70%', // Limita a altura do modal
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  turmaButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  textoTurma: {
    fontSize: 16,
  },
});

export default NotasGestao;
