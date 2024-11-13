import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeGestures from 'react-native-swipe-gestures';

// Funções para interagir com a API
const fetchReclamacoes = async (idPessoa) => {
  try {
    const response = await fetch(`http://localhost:3000/reclamacoes/${idPessoa}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar reclamações:', error);
  }
};

const responderReclamacao = async (idReclamacao, resposta) => {
  try {
    const response = await fetch('http://localhost:3000/responder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idReclamacao, resposta }),
    });
    const data = await response.json();
    Alert.alert('Sucesso', data.message);
  } catch (error) {
    console.error('Erro ao responder reclamação:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao responder a reclamação.');
  }
};

const excluirReclamacao = async (idReclamacao) => {
  try {
    const response = await fetch(`http://localhost:3000/excluir/${idReclamacao}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    Alert.alert('Sucesso', data.message);
  } catch (error) {
    console.error('Erro ao excluir reclamação:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao excluir a reclamação.');
  }
};

const ReclamacoesSugestGestao = () => {
  const navigation = useNavigation();
  const [mensagens, setMensagens] = useState([]);
  const [resposta, setResposta] = useState('');
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const idPessoa = 21; // O ID da pessoa é fixo para este exemplo
    fetchReclamacoes(idPessoa).then((data) => setMensagens(data));
  }, []);

  const abrirModal = (mensagem) => {
    setMensagemSelecionada(mensagem);
    setResposta(mensagem.resposta || '');
    setModalVisible(true);
  };

  const responderMensagem = (idReclamacao) => {
    if (!resposta) {
      Alert.alert('Erro', 'Por favor, escreva uma resposta antes de enviar.');
      return;
    }
    responderReclamacao(idReclamacao, resposta);
    setResposta('');
    setModalVisible(false);
  };

  const excluirMensagem = (idReclamacao) => {
    excluirReclamacao(idReclamacao);
    setMensagens(mensagens.filter(m => m.id !== idReclamacao));
    setModalVisible(false);
  };

  const onSwipeLeft = () => {
    navigation.navigate('Home');
  };

  const renderMensagem = ({ item }) => (
    <TouchableOpacity onPress={() => abrirModal(item)} style={styles.mensagemContainer}>
      <Text style={styles.mensagemAssunto}>{item.assunto}</Text>
      <Text style={styles.mensagemTexto}>
        {item.mensagem.length > 50 ? `${item.mensagem.substring(0, 50)}...` : item.mensagem}
      </Text>
      {item.resposta && <Text style={styles.respostaTexto}>Resposta: {item.resposta}</Text>}
    </TouchableOpacity>
  );

  return (
    <SwipeGestures
      onSwipeLeft={onSwipeLeft}
      config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 80 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
          renderItem={renderMensagem}
        />

        {mensagemSelecionada && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalAssunto}>{mensagemSelecionada.assunto}</Text>
                <Text style={styles.modalMensagem}>{mensagemSelecionada.mensagem}</Text>

                <TextInput
                  style={styles.inputResposta}
                  placeholder="Escreva sua resposta..."
                  value={resposta}
                  onChangeText={setResposta}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => responderMensagem(mensagemSelecionada.id)}
                >
                  <Text style={styles.buttonText}>Responder</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.excluirButton]}
                  onPress={() => excluirMensagem(mensagemSelecionada.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.fecharButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SwipeGestures>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mensagemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mensagemAssunto: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  mensagemTexto: {
    fontSize: 14,
    marginBottom: 10,
  },
  respostaTexto: {
    color: 'green',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalAssunto: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  modalMensagem: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputResposta: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00527C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  excluirButton: {
    backgroundColor: '#b81414',
  },
  fecharButton: {
    backgroundColor: '#ff6400',
  },
  buttonText: {
    color: '#fff',
  },
});

export default ReclamacoesSugestGestao;
