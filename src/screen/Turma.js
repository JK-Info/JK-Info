import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TurmaScreen = () => {
  const [notas, setNotas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('jwtToken');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (!token) {
      console.error('Token não encontrado!');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Notas
        const notasResponse = await fetch('http://localhost:3000/notasTurma', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const notasData = await notasResponse.json();
        console.log('Notas:', notasData);
        setNotas(notasData);

        // Fetch Alunos
        const alunosResponse = await fetch('http://localhost:3000/alunosTurma', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const alunosData = await alunosResponse.json();
        console.log('Alunos:', alunosData);
        setAlunos(alunosData);

        // Fetch Professores
        const professoresResponse = await fetch('http://localhost:3000/professoresTurma', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const professoresData = await professoresResponse.json();
        console.log('Professores:', professoresData);
        setProfessores(professoresData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleNotaChange = (text, index) => {
    const updatedNotas = [...notas];
    updatedNotas[index] = { ...updatedNotas[index], nota: text };
    setNotas(updatedNotas);
  };

  const renderAlunoItem = ({ item }) => (
    <View style={styles.alunoItem}>
      <View style={styles.avatar}></View>
      <View>
        <Text style={styles.alunoNome}>{item.NomeAluno}</Text>
        <Text style={styles.alunoEmail}>{item.EmailAluno}</Text>
      </View>
    </View>
  );

  const renderNotaItem = ({ item, index }) => (
    <TextInput
      style={styles.notaInput}
      value={item.conteudo}
      onChangeText={(text) => handleNotaChange(text, index)}
      multiline={true}
    />
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
              keyExtractor={(item, index) => index.toString()} // Garantir chave única
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
              renderItem={renderAlunoItem}
              keyExtractor={(item, index) => index.toString()} // Garantir chave única
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
