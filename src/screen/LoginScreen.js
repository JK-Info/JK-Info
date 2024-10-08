import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'aluno@teste') {
      navigation.replace('DrawerNavigatorAluno');
    } else if (email === 'professor@teste') {
      navigation.replace('DrawerNavigatorProfessor');
    } else if (email === 'gestao@teste') {
      navigation.replace('DrawerNavigatorGestao');
    } else {
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
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Digite sua senha"
          secureTextEntry
        />

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
    height: 50,
    marginLeft: 20,
    width: '90%',
    borderColor: '#00527C', // Blue border
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20, // Rounded edges
    color: '#000', // Text color
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
    backgroundColor: '#fff', // White background
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  textos: {
    color: '#000', // Text color
    marginLeft: 20,
    marginTop: 10,
  },
  logar: {
    alignItems: 'center',
    marginLeft: '25%',
    width: '50%',
    height: 50,
    backgroundColor: '#ff6400', // Orange button
    borderRadius: 20, // Rounded edges
    justifyContent: 'center',
  },
  textLogar: {
    color: 'white',
    padding: 5,
  },
});
