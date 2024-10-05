import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeGestures from 'react-native-swipe-gestures';

const ReclamacoesSugestGestao = () => {
  const navigation = useNavigation();

  // Simulação de mensagens enviadas pelos alunos
  const [mensagens, setMensagens] = useState([
    { id: '1', assunto: 'Problema com a plataforma', mensagem: 'Estou tendo dificuldades em acessar o sistema.', resposta: '' },
    { id: '2', assunto: 'Sugestão de melhorias', mensagem: 'Seria bom ter uma funcionalidade de lembrete.', resposta: '' },
  ]);

  const [resposta, setResposta] = useState(''); // Estado para armazenar a resposta atual
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null); // Armazena a mensagem que está sendo visualizada
  const [modalVisible, setModalVisible] = useState(false); // Controle de exibição do modal

  // Função para excluir mensagem
  const excluirMensagem = (id) => {
    setMensagens(mensagens.filter(mensagem => mensagem.id !== id));
    setModalVisible(false);
    Alert.alert('Mensagem excluída', 'A mensagem foi excluída com sucesso!');
  };

  // Função para responder à mensagem
  const responderMensagem = (id) => {
    if (!resposta) {
      Alert.alert('Erro', 'Por favor, escreva uma resposta antes de enviar.');
      return;
    }

    const mensagensAtualizadas = mensagens.map(mensagem => 
      mensagem.id === id ? { ...mensagem, resposta } : mensagem
    );
    
    setMensagens(mensagensAtualizadas);
    setResposta(''); // Limpa o campo de resposta
    setModalVisible(false); // Fecha o modal
    Alert.alert('Sucesso', 'Resposta enviada com sucesso!');
  };

  // Função para abrir o modal com a mensagem selecionada
  const abrirModal = (mensagem) => {
    setMensagemSelecionada(mensagem);
    setResposta(mensagem.resposta); // Carrega a resposta atual da mensagem (se houver)
    setModalVisible(true);
  };

  const onSwipeLeft = () => {
    navigation.navigate('Home');
  };

  const onSwipeRight = () => {
    // Não faz nada na tela de ReclamacoesSugest
  };

  // Renderiza uma mensagem
  const renderMensagem = ({ item }) => (
    <TouchableOpacity onPress={() => abrirModal(item)} style={styles.mensagemContainer}>
      <Text style={styles.mensagemAssunto}>{item.assunto}</Text>
      <Text style={styles.mensagemTexto}>
        {item.mensagem.length > 50 ? `${item.mensagem.substring(0, 50)}...` : item.mensagem}
      </Text>
      {item.resposta !== '' && (
        <Text style={styles.respostaTexto}>Resposta: {item.resposta}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SwipeGestures
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 80 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
          renderItem={renderMensagem}
        />

        {/* Modal para exibir a mensagem completa */}
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
                  onChangeText={text => setResposta(text)}
                />

                <TouchableOpacity
                  style={styles.responderButton}
                  onPress={() => responderMensagem(mensagemSelecionada.id)}
                >
                  <Text style={styles.buttonText}>Responder</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.excluirButton}
                  onPress={() => excluirMensagem(mensagemSelecionada.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.fecharButton}
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
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  mensagemContainer: {
    backgroundColor: '#fff',
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
  responderButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  excluirButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  fecharButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
  },
});

export default ReclamacoesSugestGestao;
