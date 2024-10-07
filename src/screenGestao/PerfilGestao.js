import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const FotoPerfil = ({ foto }) => (
  <Image
    source={foto ? { uri: foto } : require('../../assets/FotosPerfil/Foto-perfil-Anonima.jpg')}
    style={styles.fotoPerfil}
  />
);

const InformacoesPerfil = () => (
  <View style={styles.informacoesContainer}>
    <Text style={styles.nomeProfessor}>Nome do Professor(a)</Text>
    <Text style={styles.emailProfessor}>Email: professor@etec.sp.gov.br</Text>
    <View style={styles.dadosProfessor}>
      <Text>LinkedIn: professor.br.com</Text>
    </View>
  </View>
);

const BotaoEditar = ({ onPress }) => (
  <TouchableOpacity style={styles.botaoContainer} onPress={onPress}>
    <Text style={styles.textoBotao}>Editar Perfil</Text>
  </TouchableOpacity>
);

const PerfilGestao = () => {
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const editarFotoPerfil = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção da imagem');
      } else if (response.error) {
        console.log('Erro ao selecionar imagem: ', response.error);
      } else {
        setFotoPerfil(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FotoPerfil foto={fotoPerfil} />
      <InformacoesPerfil />
      <BotaoEditar onPress={editarFotoPerfil} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // Fundo branco consistente
  },
  fotoPerfil: {
    width: 250,
    height: 250,
    borderRadius: 125, // Bordas arredondadas
    marginBottom: 20,
    borderWidth: 2,
  },
  informacoesContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nomeProfessor: {
    fontSize: 25,
    margin: 10,
    color: '#333', // Cor do nome
  },
  emailProfessor: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: '#333', // Cor do texto
  },
  dadosProfessor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
    color: '#333', // Cor do texto
  },
  botaoContainer: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: '#ff6400', // Laranja para o botão
    padding: 15,
    borderRadius: 30, // Bordas arredondadas
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default PerfilGestao;