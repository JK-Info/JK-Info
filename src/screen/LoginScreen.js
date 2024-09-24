
import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
//import styles from './style';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if(email === 'aluno@teste'){
      navigation.replace('DrawerNavigatorAluno');
    }
    else if(email === 'professor@teste'){
      navigation.replace('DrawerNavigatorProfessor')
    }
    else
    {
      Alert.alert('Erro', 'Credenciais inválidas!');
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
        <Text style={styles.textos}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.textos}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        {/* <Button
          title="Logar"
          onPress={handleLogin}
          style={styles.logar}
        /> */}

        <TouchableOpacity style={styles.logar} onPress={handleLogin}>
          <Text style={styles.textLogar}>Entrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    marginLeft: 20,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 30,
    fontFamily: ''
  },
  j: {
    fontSize: 50,
    fontWeight: 750,
    color: '#02033f',
  },
  k: {
    fontSize: 50,
    fontWeight: 750,
    color: '#ff6400'
  },
  info: {
    fontSize: 50,
    fontWeight: 750,
    marginLeft: 15,
    color: '#02033f',
  },
  h1: {
    flexDirection: 'row',
    margin: 80,
  },
  form: {
    width: '30%',
    height: 300,
    backgroundColor: '#02033f',
    borderRadius: 30,
    shadowColor: '#000',
    borderWidth: 0,
    shadowRadius: 20
  },
  textos: {
    color: 'white',
    marginLeft: 20,
    marginTop: 20,
  },
  logar: {
    display: 1,
    alignItems: 'center',
    marginLeft: '25%',
    width: '50%',
    height: 30,
    backgroundColor: 'green',
    borderRadius: 30,
  },
  textLogar: {
    color: 'white',
    padding: 5,
  }
});
