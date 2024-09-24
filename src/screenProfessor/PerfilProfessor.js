import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const FotoPerfil = () => (
  <Image
    source={require('../../assets/FotosPerfil/Foto-perfil-Anonima.jpg')}
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
  const EditarPerfil = () => {
    console.log('Editar perfil');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FotoPerfil />
      <InformacoesPerfil />
      <BotaoEditar onPress={EditarPerfil} />
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
  editarButton: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: '#007BFF', // Example button color
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  textEditar: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default PerfilProfessor;
