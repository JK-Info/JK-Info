import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert, ScrollView } from 'react-native';

const NotasGetao = () => {
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
    setTurmaSelecionada(item.turma);
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
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisible(false)}>
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
    borderRadius: 10, // Borda arredondada
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
    borderRadius: 10, // Borda arredondada
    marginBottom: 20,
    alignItems: 'center',
  },
  notaContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10, // Borda arredondada
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
    borderRadius: 10, // Borda arredondada
  },
  deleteButton: {
    backgroundColor: '#ff6400',
    padding: 10,
    borderRadius: 10, // Borda arredondada
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
    borderRadius: 10, // Borda arredondada
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
    borderRadius: 10, // Borda arredondada
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
    borderRadius: 10, // Borda arredondada
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
