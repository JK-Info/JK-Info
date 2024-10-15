import axios from 'axios';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, preencha o campo de email.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/login', { email });
  
      if (response.data.user) {
        const user = response.data.user;
  
        // Verifica o tipo de usuário e redireciona para a tela apropriada
        if (user.tipoUsuario === 'aluno') {
          navigation.replace('DrawerNavigatorAluno'); // Redireciona para a tela do aluno
        } else if (user.tipoUsuario === 'professor') {
          navigation.replace('DrawerNavigatorProfessor'); // Redireciona para a tela do professor
        } else if (user.tipoUsuario === 'funcionario') {
          navigation.replace('DrawerNavigatorFuncionario'); // Redireciona para a tela do funcionário
        } else {
          Alert.alert('Erro', 'Tipo de usuário não reconhecido.');
        }
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data.message || 'Email não encontrado.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o login.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.h1}>
        <Text style={styles.j}>J</Text>
        <Text style={styles.k}>K</Text>
        <Text style={styles.info}>Info</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.logar} onPress={handleLogin}>
          <Text style={styles.textLogar}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#00527C', 
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20, 
    color: '#000', 
  },
  j: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#00527C',
  },
  k: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff6400',
  },
  info: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#00527C',
  },
  h1: {
    flexDirection: 'row',
    margin: 80,
  },
  form: {
    width: '90%',
    padding: 20,
    elevation: 5,
  },
  logar: {
    alignItems: 'center',
    width: '50%',
    height: 50,
    backgroundColor: '#ff6400', 
    borderRadius: 20,
    justifyContent: 'center',
  },
  textLogar: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
