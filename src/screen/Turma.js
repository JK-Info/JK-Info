import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TurmaScreen = () => {
  const [notas, setNotas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [token, setToken] = useState('');
  const [nomeAluno, setNomeAluno] = useState('');
  const [rmAluno, setRmAluno] = useState('');


  // Função para obter o token de autenticação
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      setToken(token);
    } catch (error) {
      console.error('Erro ao obter o token', error);
    }
  };

  // Carregar o token quando o componente for montado
  useEffect(() => {
    getToken();
  }, []);

  const fetchAlunoLogado = async () => {
    try {
      const alunoResponse = await fetch('http://localhost:3000/alunoLogado', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const alunoData = await alunoResponse.json();
      if (alunoData) {
        setNomeAluno(alunoData.nomeAluno);
        setRmAluno(alunoData.rmAluno);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do aluno:', error);
    }
  };

  // Função para buscar os dados (alunos, professores e notas)
  const fetchData = async () => {
    try {

      const alunosResponse = await fetch('http://localhost:3000/alunosTurma', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const professoresResponse = await fetch('http://localhost:3000/professoresTurma', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const notasResponse = await fetch('http://localhost:3000/notasTurma', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const alunosData = await alunosResponse.json();
      console.log("Alunos da Turma Recebidos: ");

      const professoresData = await professoresResponse.json();
      console.log("Professores Recebidos: ");

      const notasData = await notasResponse.json();
      console.log("Notas recebidas: ", notasData);

      setAlunos(alunosData);
      setProfessores(professoresData);
      setNotas(notasData);
    } catch (error) {
      console.error('Erro ao buscar dados da turma:', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // Carregar os dados quando o token for atualizado
  useEffect(() => {
    if (token) {
      fetchData();
      fetchAlunoLogado();
    }
  }, [token]);

  const renderNotaItem = ({ item, index }) => (
    <TextInput
      style={styles.notaInput}
      value={item.nota ? item.nota.toString() : 'N/A'}
      multiline={true}
      editable={false}
    />
  );

  const renderAlunoItem = ({ item }) => (
    <View style={styles.alunoItem}>
      <Text>{item.NomeAluno}</Text>
    </View>
  );

  const renderProfessorItem = ({ item }) => (
    <View style={styles.professorItem}>
      <Text>{item.NomeProfessor}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
    <View style={styles.perfil}>
      <View style={styles.avatar}></View>
      <View>
        <Text style={styles.alunoNome}>{nomeAluno || 'Nome do aluno'}</Text>
        <Text style={styles.alunoRM}>{rmAluno || 'RM'}</Text>
      </View>
    </View>

      <View style={styles.notasSection}>
        <Text style={styles.notasHeader}>Lembretes</Text>
        <FlatList
          data={notas}
          renderItem={renderNotaItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.listasEmailSection}>
        <View style={styles.rowContainer}>
          <View style={styles.alunosSection}>
            <Text style={styles.sectionHeader}>Alunos da Turma</Text>
            <FlatList
              data={alunos}
              renderItem={renderAlunoItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
            />
          </View>

          <View style={styles.professoresSection}>
            <Text style={styles.sectionHeader}>Professores da Turma</Text>
            <FlatList
              data={professores}
              renderItem={renderProfessorItem}
              keyExtractor={(item, index) => index.toString()}
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
  notaInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: '#f5f5f5',
    maxHeight: 400,
  },
  professoresSection: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    maxHeight: 400,
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  professorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
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
