import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native';

const TurmaScreen = () => {
  const [notas, setNotas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  
  // Substitua 'seu_token_aqui' pelo token de autenticação obtido após o login
  const token = 'seu_token_aqui';

  useEffect(() => {
    // Buscar Notas (Lembretes)
    fetch('http://localhost:3000/notasTurma', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setNotas(data))
      .catch((error) => console.error('Erro ao buscar notas:', error));

    // Buscar Alunos da Turma
    fetch('http://localhost:3000/alunosTurma', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setAlunos(data))
      .catch((error) => console.error('Erro ao buscar alunos:', error));

    // Buscar Professores da Turma
    fetch('http://localhost:3000/professoresTurma', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setProfessores(data))
      .catch((error) => console.error('Erro ao buscar professores:', error));
  }, []);

  const handleNotaChange = (text, index) => {
    const updatedNotas = [...notas];
    updatedNotas[index] = text;
    setNotas(updatedNotas);
  };

  const renderAlunoItem = ({ item }) => (
    <View style={styles.alunoItem}>
      <View style={styles.avatar}></View>
      <View>
        <Text style={styles.alunoNome}>{item.nome}</Text>
        <Text style={styles.alunoEmail}>{item.email}</Text>
      </View>
    </View>
  );

  const renderNotaItem = ({ item, index }) => (
    <TextInput
      style={styles.notaInput}
      value={item.nota}
      onChangeText={(text) => handleNotaChange(text, index)}
      multiline={true} // Permite múltiplas linhas
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
        <View style={styles.notasItem}>
          <FlatList
            data={notas}
            renderItem={renderNotaItem}
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
              data={alunos}
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
              data={professores}
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
    textAlign: 'start', // Alinhar RM à direita
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
    backgroundColor: '#f5f5f5', // Cor de fundo padrão para alunos
    maxHeight: 400, // Altura máxima para permitir rolagem
  },
  professoresSection: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#f5f5f5', // Cor de fundo padrão para professores
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
    backgroundColor: '#fff', // Cor de fundo para cada item da lista
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
