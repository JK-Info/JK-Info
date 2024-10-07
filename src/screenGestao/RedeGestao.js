import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Modal, Button, Image } from 'react-native';

const RedeGestao = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState('Todas');

  const alunosData = [
    { key: '1', nome: 'Guilherme Gomes', email: 'guilherme.silva2616@etec.sp.gov.br', turma: '1 módulo - Administração - Tarde' },
    { key: '2', nome: 'Fernanda Santos', email: 'fernanda.santos@etec.sp.gov.br', turma: '1 módulo - Desenvolvimento de Sistema - Tarde' },
    { key: '3', nome: 'Pedro Souza', email: 'pedro.souza@etec.sp.gov.br', turma: '1 módulo - Logistica - Tarde' },
    { key: '4', nome: 'Mariana Oliveira', email: 'mariana.oliveira@etec.sp.gov.br', turma: '1 módulo - Administração - Noite' },
    { key: '5', nome: 'Lucas Silva', email: 'lucas.silva@etec.sp.gov.br', turma: '1 módulo - Desenvolvimento de Sistema - Noite' },
    { key: '6', nome: 'Ana Maria', email: 'ana.maria@etec.sp.gov.br', turma: '1 módulo - Logistica - Noite' },
  ];

  const diretoresData = [
    { key: '1', nome: 'Diretor 1', email: 'diretor1@example.com' },
    { key: '2', nome: 'Diretor 2', email: 'diretor2@example.com' },
    { key: '3', nome: 'Diretor 3', email: 'diretor3@example.com' },
    { key: '4', nome: 'Diretor 4', email: 'diretor4@example.com' },
  ];

  const turmas = [
    'Todas',
    '1 módulo - Administração - Tarde',
    '2 módulo - Administração - Tarde',
    '3 módulo - Administração - Tarde',
    '1 módulo - Desenvolvimento de Sistema - Tarde',
    '2 módulo - Desenvolvimento de Sistema - Tarde',
    '3 módulo - Desenvolvimento de Sistema - Tarde',
    '1 módulo - Logistica - Tarde',
    '2 módulo - Logistica - Tarde',
    '3 módulo - Logistica - Tarde',
    '1 módulo - Administração - Noite',
    '2 módulo - Administração - Noite',
    '3 módulo - Administração - Noite',
    '1 módulo - Desenvolvimento de Sistema - Noite',
    '2 módulo - Desenvolvimento de Sistema - Noite',
    '3 módulo - Desenvolvimento de Sistema - Noite',
    '1 módulo - Logistica - Noite',
    '2 módulo - Logistica - Noite',
    '3 módulo - Logistica - Noite',
  ];

  const filtrarAlunos = () => {
    return turmaSelecionada === 'Todas' ? alunosData : alunosData.filter(aluno => aluno.turma === turmaSelecionada);
  };

  const renderAlunoItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('../../assets/FotosPerfil/Foto-perfil-Anonima.jpg')} // Imagem padrão
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.alunoNome}>{item.nome}</Text>
        <Text style={styles.alunoEmail}>{item.email}</Text>
      </View>
    </View>
  );

  const renderDiretorItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('../../assets/FotosPerfil/Foto-perfil-Anonima.jpg')} // Imagem padrão
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.alunoNome}>{item.nome}</Text>
        <Text style={styles.alunoEmail}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoFiltro}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textoBotao}>Filtrar por Turma: {turmaSelecionada}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.titulo}>Emails dos Diretores:</Text>
        <View style={styles.listaContainer}>
          <FlatList
            data={diretoresData}
            renderItem={renderDiretorItem}
            keyExtractor={item => item.key}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Text style={styles.titulo}>Emails dos Alunos:</Text>
        <View style={styles.listaContainer}>
          <FlatList
            data={filtrarAlunos()}
            renderItem={renderAlunoItem}
            keyExtractor={item => item.key}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Selecionar Turma</Text>
            <ScrollView style={styles.turmaScroll}>
              {turmas.map((turma, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.turmaButton}
                  onPress={() => {
                    setTurmaSelecionada(turma);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textoTurma}>{turma}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
              <TouchableOpacity style={styles.botaoFechar} onPress={()=> setModalVisible(false)}>
                <Text style={styles.textoBotaoFechar}>Fechar</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  botaoFiltro: {
    backgroundColor: '#ff6400',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  listaContainer: {
    backgroundColor: '#dddddd', // Cor de fundo das listas
    borderRadius: 8,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  alunoEmail: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#dddddd',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  turmaScroll: {
    maxHeight: 300,
    width: '100%',
  },
  turmaButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  textoTurma: {
    fontSize: 16,
    color: '#333',
  },
  botaoFechar: {
  backgroundColor: '#ff6400',
  padding: 15,
  borderRadius: 20, // Valor para bordas arredondadas
  alignItems: 'center',
  marginBottom: 20,
},
textoBotaoFechar: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},
});

export default RedeGestao;