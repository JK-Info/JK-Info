import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

const dataAlunos = [
  { key: '1', name: 'Guilherme Gomes', email: 'guilherme.silva2616@etec.sp.gov.br' },
  { key: '2', name: 'Fernanda Santos', email: 'fernanda.santos@etec.sp.gov.br' },
  { key: '3', name: 'Pedro Souza', email: 'pedro.souza@etec.sp.gov.br' },
  { key: '4', name: 'Mariana Oliveira', email: 'mariana.oliveira@etec.sp.gov.br' },
];

const dataProfessores = [
  { key: '1', name: 'Prof. Carlos Silva', email: 'carlos.silva@etec.sp.gov.br' },
  { key: '2', name: 'Prof. Ana Paula', email: 'ana.paula@etec.sp.gov.br' },
  { key: '3', name: 'Prof. Marcos Oliveira', email: 'marcos.oliveira@etec.sp.gov.br' },
  { key: '4', name: 'Prof. Marcos Oliveira', email: 'marcos.oliveira@etec.sp.gov.br' }
];

const TurmaScreen = () => {

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.avatar}></View>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}></View>
        <View>
          <Text style={styles.studentName}>Nome do aluno(a)</Text>
          <Text style={styles.rm}>RM</Text>
        </View>
      </View>

      <View style={styles.newsSection}>
        <Text style={styles.newsHeader}>Notícias da Turma</Text>
        <View style={styles.newsItem}>
          <Text>Leonardo: Postada a atividade de PAM</Text>
          <Text>Jefferson: Data de entrega da atividade de DES</Text>
          <Text>Ederson: Enviado o Power Point da aula de sexta</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Alunos da Turma</Text>
          <FlatList
            data={dataAlunos}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            scrollEnabled={false} // Desabilita o scroll do FlatList
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Professores da Turma</Text>
          <FlatList
            data={dataProfessores}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            scrollEnabled={false} // Desabilita o scroll do FlatList
          />
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
  profile: {
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
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rm: {
    fontSize: 14,
    color: '#555',
  },
  newsSection: {
    padding: 10,
  },
  newsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  section: {
    flex: 1,
    paddingHorizontal: 10,
    maxWidth: "45%",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: "center",
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
  },
  name: {
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});

export default TurmaScreen;
