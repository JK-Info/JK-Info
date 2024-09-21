import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

const alunosData = [
  { key: '1', nome: 'Guilherme Gomes', email: 'guilherme.silva2616@etec.sp.gov.br' },
  { key: '2', nome: 'Fernanda Santos', email: 'fernanda.santos@etec.sp.gov.br' },
  { key: '3', nome: 'Pedro Souza', email: 'pedro.souza@etec.sp.gov.br' },
  { key: '4', nome: 'Mariana Oliveira', email: 'mariana.oliveira@etec.sp.gov.br' },
  { key: '5', nome: 'Lucas Silva', email: 'lucas.silva@etec.sp.gov.br' },
  { key: '6', nome: 'Ana Maria', email: 'ana.maria@etec.sp.gov.br' },
  { key: '7', nome: 'João da Silva', email: 'joao.silva@etec.sp.gov.br' },
  { key: '8', nome: 'Maria Clara', email: 'maria.clara@etec.sp.gov.br' },
];

const professoresData = [
  { key: '1', nome: 'Prof. Carlos Silva', email: 'carlos.silva@etec.sp.gov.br' },
  { key: '2', nome: 'Prof. Ana Paula', email: 'ana.paula@etec.sp.gov.br' },
  { key: '3', nome: 'Prof. Marcos Oliveira', email: 'marcos.oliveira@etec.sp.gov.br' },
  { key: '4', nome: 'Prof. Maria Clara', email: 'maria.clara@etec.sp.gov.br' },
  { key: '5', nome: 'Prof. João Pedro', email: 'joao.pedro@etec.sp.gov.br' },
  { key: '6', nome: 'Prof. Renata', email: 'renata@etec.sp.gov.br' },
  { key: '7', nome: 'Fernanda Lima', email: 'fernanda.lima@etec.sp.gov.br' },
  { key: '8', nome: 'Lucas Almeida', email: 'lucas.almeida@etec.sp.gov.br' },
];

const TurmaScreen = () => {
  const notasData = [
    'Leonardo: Postada a atividade de PAM',
    'Jefferson: Data de entrega da atividade de DES',
    'Ederson: Enviado o Power Point da aula de sexta',
  ];

  const renderAlunoItem = ({ item }) => (
    <View style={styles.alunoItem}>
      <View style={styles.avatar}></View>
      <View>
        <Text style={styles.alunoNome}>{item.nome}</Text>
        <Text style={styles.alunoEmail}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.perfil}>
        <View style={styles.avatar}></View>
        <View>
          <Text style={styles.alunoNome}>Nome do aluno(a)</Text>
          <Text style={styles.alunoRM}>RM</Text>
        </View>
      </View>

      <View style={styles.notasSection}>
        <Text style={styles.notasHeader}>Notas</Text>
        <View style={styles.notasItem}>
          <FlatList
            data={notasData}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.listasEmailSection}>
        <View style={styles.rowContainer}>
          <View style={styles.alunosSection}>
            <Text style={styles.sectionHeader}>Alunos da Turma</Text>
            <FlatList
              data={alunosData}
              renderItem={renderAlunoItem}
              keyExtractor={item => item.key}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
            />
          </View>

          <View style={styles.professoresSection}>
            <Text style={styles.sectionHeader}>Professores da Turma</Text>
            <FlatList
              data={professoresData}
              renderItem={renderAlunoItem}
              keyExtractor={item => item.key}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alunoRM: {
    fontSize: 14,
    color: '#555',
  },
  notasSection: {
    padding: 10,
  },
  notasHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notasItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  alunosSection: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#fff',
    maxHeight: 400, // Altura máxima para permitir rolagem
  },
  professoresSection: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#fff',
    maxHeight: 400, // Altura máxima para permitir rolagem
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: "center",
  },
  alunoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alunoEmail: {
    fontSize: 11,
    color: '#555',
  },
  listasEmailSection: {
    paddingVertical: 10,
  },
  flatList: {
    flexGrow: 1,
  },
  flatListContent: {
    paddingBottom: 10,
  },
});

export default TurmaScreen;