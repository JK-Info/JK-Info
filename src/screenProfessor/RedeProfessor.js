import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Modal, Button } from 'react-native';

const RedeProfessor = () => {
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
      <View style={styles.avatar}></View>
      <View style={styles.textContainer}>
        <Text style={styles.alunoNome}>{item.nome}</Text>
        <Text style={styles.alunoEmail}>{item.email}</Text>
      </View>
    </View>
  );

  const renderDiretorItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.avatar}></View>
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
        <FlatList
          data={diretoresData}
          renderItem={renderDiretorItem}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
        />

        <Text style={styles.titulo}>Emails dos Alunos:</Text>
        <FlatList
          data={filtrarAlunos()}
          renderItem={renderAlunoItem}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
        />
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
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
    backgroundColor: '#f5f5f5',
  },
  botaoFiltro: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alunoEmail: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  turmaScroll: {
    maxHeight: 300, // Defina a altura máxima para permitir rolagem
    width: '100%',
  },
  turmaButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  textoTurma: {
    fontSize: 16,
  },
});

export default RedeProfessor;