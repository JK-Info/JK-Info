import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail e senha.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { email, senha });
      if (response.data.success) {
        const userType = response.data.userType;
        switch (userType) {
          case 'aluno':
            navigation.navigate('DrawerNavigatorAluno');
            break;
          case 'professor':
            navigation.navigate('DrawerNavigatorProfessor');
            break;
          case 'funcionario':
            navigation.navigate('DrawerNavigatorFuncionario');
            break;
          case 'gestao':
            navigation.navigate('DrawerNavigatorGestao');
            break;
          default:
            Alert.alert('Erro', 'Tipo de usuário inválido.');
        }
      } else {
        Alert.alert('Erro', 'Senha incorreta.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o login.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.j}>J</Text>
        <Text style={styles.k}>K</Text>
        <Text style={styles.info}>Info</Text>
      </View>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={text => setSenha(text)}
        placeholder="Digite sua senha"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão para cadastrar senha */}
      <TouchableOpacity onPress={() => navigation.navigate('CadastroSenhaScreen')}>
        <Text style={styles.linkText}>Não tem senha? Cadastre agora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
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
  input: {
    height: 50,
    width: '90%',
    borderColor: '#00527C',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: '#000',
  },
  button: {
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#00527C',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  linkText: {
    color: '#00527C',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
