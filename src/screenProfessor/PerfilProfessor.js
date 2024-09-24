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

const PerfilProfessor = () => {
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
  },
  fotoPerfil: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
  },
  informacoesContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nomeProfessor: {
    fontSize: 25,
    margin: 10,
  },
  emailProfessor: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
  },
  dadosProfessor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  botaoContainer: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default PerfilProfessor;
