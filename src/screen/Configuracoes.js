import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { clearUserData } from './SessionStorage'; // Importe a função clearUserData
import { ThemeContext } from '../Components/ThemeContext';

const Configuracoes = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useContext(ThemeContext); // Correção na desestruturação do contexto
  const [tamanhoFonte, setTamanhoFonte] = useState('medio');
  const [idioma, setIdioma] = useState('portugues');

  const handleSair = async () => {
    await clearUserData(); // Limpa os dados do usuário
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Redireciona para a tela de login
    });
    Alert.alert('Logout', 'Você saiu com sucesso!'); // Opcional: alerta de sucesso
  };

  return (
    <View style={[styles.container, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>

      <View style={styles.fundoTitulo}>
        <Text style={[styles.opcaoTitulo, theme === 'escuro' ? styles.darkText : styles.lightText]}>Tema do aplicativo:</Text>
      </View>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => toggleTheme('claro')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, theme === 'claro' && styles.radioSelecionadoActive]} />
          <Text style={[styles.radioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>Claro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleTheme('escuro')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, theme === 'escuro' && styles.radioSelecionadoActive]} />
          <Text style={[styles.radioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>Escuro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fundoTitulo}>
        <Text style={[styles.opcaoTitulo, theme === 'escuro' ? styles.darkText : styles.lightText]}>Tamanho da fonte:</Text>
      </View>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setTamanhoFonte('pequena')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tamanhoFonte === 'pequena' && styles.radioSelecionadoActive]} />
          <Text style={[styles.radioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>Pequena</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTamanhoFonte('medio')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tamanhoFonte === 'medio' && styles.radioSelecionadoActive]} />
          <Text style={[styles.radioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>Média</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTamanhoFonte('grande')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tamanhoFonte === 'grande' && styles.radioSelecionadoActive]} />
          <Text style={[styles.radioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>Grande</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fundoTitulo}>
        <Text style={[styles.opcaoTitulo, theme === 'escuro' ? styles.darkText : styles.lightText]}>Idioma do aplicativo:</Text>
      </View>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setIdioma('portugues')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, idioma === 'portugues' && styles.radioSelecionadoActive]} />
          <Text style={[styles.radioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>Português</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIdioma('ingles')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, idioma === 'ingles' && styles.radioSelecionadoActive]} />
          <Text style={[styles.radioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>Inglês</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sairContainer}>
        <TouchableOpacity onPress={handleSair} style={styles.botaoSair}>
          <Text style={styles.textoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    padding: 20,
  },
  darkTheme: {
    backgroundColor: '#292929', // Fundo escuro para o tema escuro
  },
  lightTheme: {
    backgroundColor: '#e9e9e9', // Fundo claro para o tema claro
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkText: {
    color: '#fff', // Texto claro para o tema escuro
  },
  lightText: {
    color: '#000', // Texto escuro para o tema claro
  },
  fundoTitulo: {
    backgroundColor: '#e0e0e0', // Cor de fundo leve (cinza claro)
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  opcaoTitulo: {
    fontSize: 18,
  },
  opcaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioTexto: {
    fontSize: 16,
    marginLeft: 10,
  },
  radioSelecionado: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff', // Cor da borda da bolinha
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Fundo transparente por padrão
  },
  radioSelecionadoActive: {
    backgroundColor: '#007bff', // Cor de fundo da bolinha quando selecionada
  },
  sairContainer: {
    marginTop: 'auto',
  },
  botaoSair: {
    backgroundColor: '#ff6400', // Cor de fundo do botão
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  textoSair: {
    color: '#fff', // Cor do texto
    fontSize: 16,
  },
});

export default Configuracoes;
