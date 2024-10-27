import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { clearUserData } from './SessionStorage'; // Importe a função clearUserData

const Configuracoes = () => {
  const navigation = useNavigation();
  const [tema, setTema] = useState('claro');
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.fundoTitulo}>
        <Text style={styles.opcaoTitulo}>Tema do aplicativo:</Text>
      </View>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setTema('claro')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tema === 'claro' && styles.radioSelecionadoActive]} />
          <Text style={styles.radioTexto}>Claro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTema('escuro')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tema === 'escuro' && styles.radioSelecionadoActive]} />
          <Text style={styles.radioTexto}>Escuro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fundoTitulo}>
        <Text style={styles.opcaoTitulo}>Tamanho da fonte:</Text>
      </View>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setTamanhoFonte('pequena')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tamanhoFonte === 'pequena' && styles.radioSelecionadoActive]} />
          <Text style={styles.radioTexto}>Pequena</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTamanhoFonte('medio')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tamanhoFonte === 'medio' && styles.radioSelecionadoActive]} />
          <Text style={styles.radioTexto}>Média</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTamanhoFonte('grande')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, tamanhoFonte === 'grande' && styles.radioSelecionadoActive]} />
          <Text style={styles.radioTexto}>Grande</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fundoTitulo}>
        <Text style={styles.opcaoTitulo}>Idioma do aplicativo:</Text>
      </View>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setIdioma('portugues')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, idioma === 'portugues' && styles.radioSelecionadoActive]} />
          <Text style={styles.radioTexto}>Português</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIdioma('ingles')} style={styles.radioContainer}>
          <View style={[styles.radioSelecionado, idioma === 'ingles' && styles.radioSelecionadoActive]} />
          <Text style={styles.radioTexto}>Inglês</Text>
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
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00527C', // Cor do título
  },
  fundoTitulo: {
    backgroundColor: '#e0e0e0', // Cor de fundo leve (cinza claro)
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  opcaoTitulo: {
    fontSize: 18,
    color: '#333', // Cor do texto das opções
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
    color: '#555', // Cor do texto das opções
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
