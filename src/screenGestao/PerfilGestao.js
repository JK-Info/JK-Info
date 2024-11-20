import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native'; // Importando ScrollView
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { ThemeContext } from '../Components/ThemeContext'; // Importa o ThemeContext
import { FontSizeContext } from '../Components/FontSizeProvider'; // Importa o FontSizeContext
import { LanguageContext } from '../Components/LanguageContext'; // Importa o LanguageContext

const PerfilGestao = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailInstitucional, setEmailInstitucional] = useState('');
  const [emailPessoal, setEmailPessoal] = useState('');
  const [numeroCelular, setNumeroCelular] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');

  const { theme } = useContext(ThemeContext); // Acessa o tema atual do contexto
  const { fontSize } = useContext(FontSizeContext); // Acessa o tamanho da fonte do contexto
  const { language } = useContext(LanguageContext); // Acessa o idioma do contexto

  // Função para buscar o perfil do usuário
  const fetchPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado');
        return;
      }

      const response = await axios.get('http://localhost:3000/perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const perfil = response.data;
      setNome(perfil.nome);
      setDataNascimento(perfil.dataNascimento);
      setEmailInstitucional(perfil.emailInstitucional);
      setEmailPessoal(perfil.emailPessoal || '');
      setNumeroCelular(perfil.numeroCelular || '');
      setFotoPerfil(perfil.fotoPerfil || ''); // Foto de perfil ou padrão
    } catch (error) {
      console.error(`[ERRO] Falha ao carregar perfil: ${error}`);
      Alert.alert('Erro', 'Falha ao carregar informações do perfil');
    }
  };

  // Função para atualizar o perfil do usuário
  const atualizarPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado');
        return;
      }

      await axios.put(
        'http://localhost:3000/perfil',
        { emailPessoal, numeroCelular, fotoPerfil },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error(`[ERRO] Falha ao atualizar perfil: ${error}`);
      Alert.alert('Erro', 'Falha ao atualizar informações do perfil');
    }
  };

  // Função para selecionar imagem de perfil
  const selecionarImagem = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção de imagem');
      } else if (response.errorCode) {
        console.error(`Erro ao selecionar imagem: ${response.errorMessage}`);
        Alert.alert('Erro', 'Não foi possível selecionar a imagem');
      } else {
        const uri = response.assets[0].uri;
        setFotoPerfil(uri); // Salva o caminho da imagem selecionada no estado
      }
    });
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
        {/* Exibindo imagem de perfil */}
        <TouchableOpacity style={styles.fotoContainer} onPress={selecionarImagem}>
          <Image
            source={{ uri: fotoPerfil || 'https://via.placeholder.com/150' }} // Foto padrão caso não exista
            style={styles.fotoPerfil}
          />
          <Text style={[styles.textoAlterarFoto, theme === 'escuro' ? styles.darkText : styles.lightText]}>
            {language === 'pt' ? 'Alterar foto de perfil' : 'Change profile picture'}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.label, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
          {language === 'pt' ? 'Nome:' : 'Name:'}
        </Text>
        <Text style={[styles.value, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>{nome}</Text>

        <Text style={[styles.label, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
          {language === 'pt' ? 'Data de Nascimento:' : 'Date of Birth:'}
        </Text>
        <Text style={[styles.value, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>{dataNascimento}</Text>

        <Text style={[styles.label, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
          {language === 'pt' ? 'Email Institucional:' : 'Institutional Email:'}
        </Text>
        <Text style={[styles.value, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>{emailInstitucional}</Text>

        <Text style={[styles.label, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
          {language === 'pt' ? 'Email Pessoal:' : 'Personal Email:'}
        </Text>
        <TextInput
          style={[styles.input, { fontSize }]}
          value={emailPessoal}
          onChangeText={setEmailPessoal}
          placeholder={language === 'pt' ? 'Digite seu email pessoal' : 'Enter your personal email'}
          placeholderTextColor={theme === 'escuro' ? '#888' : '#999'}
        />

        <Text style={[styles.label, theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
          {language === 'pt' ? 'Número de Celular:' : 'Phone Number:'}
        </Text>
        <TextInput
          style={[styles.input, { fontSize }]}
          value={numeroCelular}
          onChangeText={setNumeroCelular}
          placeholder={language === 'pt' ? 'Digite seu número de celular' : 'Enter your phone number'}
          placeholderTextColor={theme === 'escuro' ? '#888' : '#999'}
        />

        <Button title={language === 'pt' ? 'Atualizar Perfil' : 'Update Profile'} onPress={atualizarPerfil} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20, // Espaço adicional no final do conteúdo rolável
  },
  darkTheme: {
    backgroundColor: '#292929', // Fundo escuro para o tema escuro
  },
  lightTheme: {
    backgroundColor: '#f9f9f9', // Fundo claro para o tema claro
  },
  darkText: {
    color: '#000000', // Texto claro para o tema escuro
  },
  lightText: {
    color: '#000000', // Texto escuro para o tema claro
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00527C', // Cor do título
    backgroundColor: '#e0e0e0', // Cor de fundo leve (cinza claro)
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  value: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 250,
    height: 250,
    borderRadius: 125, // Bordas arredondadas
    marginBottom: 20,
    borderWidth: 2,
  },
  textoAlterarFoto: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default PerfilGestao;
