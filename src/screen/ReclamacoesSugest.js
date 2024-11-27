import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeGestures from 'react-native-swipe-gestures';
import { TouchableOpacity } from 'react-native';

const ReclamacoesSugest = () => {
  const navigation = useNavigation();
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  
  // ID da pessoa (essa variável deve vir de algum serviço de autenticação)
  const Pessoa_idPessoa = 1; // Exemplo de ID de usuário autenticado

  const EnviarReclamacoesouSugestoes = async () => {
    if (!assunto || !mensagem) {
      setMensagemErro('Por favor, preencha todos os campos.');
      setTimeout(() => {
        setMensagemErro('');
      }, 5000);
      return;
    }

    const dados = {
      assunto: assunto,
      mensagem: mensagem,
      Pessoa_idPessoa: Pessoa_idPessoa, // Passa o ID da pessoa
    };

    try {
      // Envia a requisição para a API
      const response = await fetch('http://localhost:3000/reclamacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();

      if (response.status === 200) {
        setMensagemEnviada(true);
        setAssunto('');
        setMensagem('');
        setMensagemErro('');
        
        // Mensagem de sucesso
        setTimeout(() => {
          setMensagemEnviada(false);
        }, 5000);
      } else {
        setMensagemErro(result.message || 'Erro ao enviar reclamação.');
      }
    } catch (error) {
      console.error('Erro ao enviar reclamação:', error);
      setMensagemErro('Erro ao enviar reclamação.');
    }
  };

  const onSwipeLeft = () => {
    navigation.navigate('Home');
  };

  const onSwipeRight = () => {
    // Não faz nada na tela de ReclamacoesSugest
  };

  return (
    <SwipeGestures
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 80 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.inputAssunto}
          placeholder="Assunto"
          value={assunto}
          onChangeText={text => setAssunto(text)}
        />

        <ScrollView
          style={styles.inputMensagemContainer}
          contentContainerStyle={styles.inputMensagemContentContainer}
        >
          <TextInput
            style={styles.inputMensagem}
            multiline
            placeholder="Descreva a sua Reclamação ou Sugestão"
            value={mensagem}
            onChangeText={text => setMensagem(text)}
          />
        </ScrollView>

        <TouchableOpacity onPress={EnviarReclamacoesouSugestoes} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>

        {mensagemErro !== '' && (
          <Text style={styles.mensagemErro}>{mensagemErro}</Text>
        )}
        {mensagemEnviada && (
          <Text style={styles.mensagemEnviada}>Mensagem enviada com sucesso!</Text>
        )}
      </View>
    </SwipeGestures>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  inputAssunto: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 10,
    marginVertical: 10,
  },
  inputMensagemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 18,
    width: '100%',
    maxHeight: 300,
    marginBottom: 10,
  },
  inputMensagemContentContainer: {
    flexGrow: 1,
  },
  inputMensagem: {
    flex: 1,
    padding: 10,
  },
  mensagemEnviada: {
    color: 'green',
    marginTop: 10,
  },
  mensagemErro: {
    color: 'red',
    marginTop: 10,
  },
  sendButton: {
    width: '30%',
    backgroundColor: '#ff6400',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ReclamacoesSugest;
