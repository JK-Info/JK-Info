
import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

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
      <Text>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <Button
        title="Logar"
        onPress={handleLogin}
      />
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
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
