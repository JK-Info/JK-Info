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
    <Text style={styles.nomeAluno}>Nome do Aluno(a)</Text>
    <Text style={styles.emailAluno}>Email: alunoteste@etec.sp.gov.br</Text>
    <View style={styles.dadosAluno}>
      <Text>RM: 99999</Text>
      <Text>LinkedIn: aluno.br.com</Text>
    </View>
  </View>
);

const BotaoEditar = ({ onPress }) => (
  <TouchableOpacity style={styles.botaoContainer} onPress={onPress}>
    <Text style={styles.textoBotao}>Editar Perfil</Text>
  </TouchableOpacity>
);

const Perfil = () => {
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const editarFotoPerfil = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção da imagem');
      } else if (response.error) {
        console.log('Erro ao selecionar imagem: ', response.error);
      } else {
        setFotoPerfil(response.assets[0].uri); // Atualiza o estado com a nova imagem
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FotoPerfil foto={fotoPerfil} />
      <InformacoesPerfil />
      <BotaoEditar onPress={editarFotoPerfil} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Turma</Text>
          <Text style={styles.tableHeaderText}>Semestre</Text>
          <Text style={styles.tableHeaderText}>Ano</Text>
          <Text style={styles.tableHeaderText}>Módulo</Text>
          <Text style={styles.tableHeaderText}>Situação</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>A1</Text>
          <Text style={styles.tableCell}>1º Semestre</Text>
          <Text style={styles.tableCell}>2024</Text>
          <Text style={styles.tableCell}>Introdução</Text>
          <Text style={styles.tableCell}>Em andamento</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>A1</Text>
          <Text style={styles.tableCell}>1º Semestre</Text>
          <Text style={styles.tableCell}>2024</Text>
          <Text style={styles.tableCell}>Introdução</Text>
          <Text style={styles.tableCell}>Em andamento</Text>
        </View>
      </View>
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
  nomeAluno: {
    fontSize: 25,
    margin: 10,
  },
  emailAluno: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
  },
  dadosAluno: {
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
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tableCell: {
    textAlign: 'center',
  },
});

export default Perfil;
