import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Configuracoes = () => {
  const navigation = useNavigation();
  const [tema, setTema] = useState('claro');
  const [tamanhoFonte, setTamanhoFonte] = useState('medio');
  const [idioma, setIdioma] = useState('portugues');

  const handleSair = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <Text style={styles.opcaoTitulo}>Tema do aplicativo:</Text>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setTema('claro')} style={styles.radioContainer}>
          <Text style={styles.radioTexto}>Claro</Text>
          {tema === 'claro' && <View style={styles.radioSelecionado} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTema('escuro')} style={styles.radioContainer}>
          <Text style={styles.radioTexto}>Escuro</Text>
          {tema === 'escuro' && <View style={styles.radioSelecionado} />}
        </TouchableOpacity>
      </View>

      <Text style={styles.opcaoTitulo}>Tamanho da fonte:</Text>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setTamanhoFonte('pequena')} style={styles.radioContainer}>
          <Text style={styles.radioTexto}>Pequena</Text>
          {tamanhoFonte === 'pequena' && <View style={styles.radioSelecionado} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTamanhoFonte('medio')} style={styles.radioContainer}>
          <Text style={styles.radioTexto}>Média</Text>
          {tamanhoFonte === 'medio' && <View style={styles.radioSelecionado} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTamanhoFonte('grande')} style={styles.radioContainer}>
          <Text style={styles.radioTexto}>Grande</Text>
          {tamanhoFonte === 'grande' && <View style={styles.radioSelecionado} />}
        </TouchableOpacity>
      </View>

      <Text style={styles.opcaoTitulo}>Idioma do aplicativo:</Text>
      <View style={styles.opcaoContainer}>
        <TouchableOpacity onPress={() => setIdioma('portugues')} style={styles.radioContainer}>
          <Text style={styles.radioTexto}>Português</Text>
          {idioma === 'portugues' && <View style={styles.radioSelecionado} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIdioma('ingles')} style={styles.radioContainer}>
          <Text style={styles.radioTexto}>Inglês</Text>
          {idioma === 'ingles' && <View style={styles.radioSelecionado} />}
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
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  opcaoTitulo: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
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
    marginRight: 10,
  },
  radioSelecionado: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  sairContainer: {
    marginTop: 'auto',
  },
  botaoSair: {
    backgroundColor: '#ff4d4d', // Cor de fundo do botão
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoSair: {
    color: '#fff', // Cor do texto
    fontSize: 16,
  },
});

export default Configuracoes;