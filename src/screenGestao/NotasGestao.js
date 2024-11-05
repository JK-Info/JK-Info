import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Modal, Image, TextInput, Button } from 'react-native';
import axios from 'axios';

const NotasGestao = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState('Todas');
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [nota, setNota] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [modalTurmaVisible, setModalTurmaVisible] = useState(false);

  // Função para buscar as turmas do banco de dados
  const fetchTurmas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getturmasnotas');
      setTurmas(response.data); // Armazena as turmas no estado
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  // Função para buscar todos os alunos ou alunos filtrados por turma
  const fetchAlunos = async (turma) => {
    try {
      const response = await axios.get(`http://localhost:3000/getalunosnotas?turma=${turma}`); // Certifique-se de que 'turma' seja o parâmetro correto
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  useEffect(() => {
    fetchTurmas(); // Chama a função ao montar o componente
    fetchAlunos(''); // Busca todos os alunos ao carregar a página
  }, []);

  useEffect(() => {
    if (turmaSelecionada === 'Todas') {
      fetchAlunos(''); // Busque todos os alunos
    } else {
      fetchAlunos(turmaSelecionada);
    }
  }, [turmaSelecionada]);

  const renderAlunoItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleAlunoSelect(item)}>
      <Image
        source={require('../../assets/FotosPerfil/Foto-perfil-Anonima.jpg')}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.alunoNome}>{item.NomeAluno || 'Nome não disponível'}</Text>
        <Text style={styles.alunoEmail}>{item.EmailInstitucional || 'Email não disponível'}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAlunoSelect = (aluno) => {
    setAlunoSelecionado(aluno);
    setNota(''); // Limpa a nota ao selecionar um aluno
    setModalVisible(true); // Abre o modal para inserir/editar nota
  };

  const handleNotaSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/adicionarNota', {
        alunoId: alunoSelecionado.id, // Ajuste conforme sua estrutura de dados
        nota: nota,
      });
      setModalVisible(false); // Fecha o modal após salvar a nota
      fetchAlunos(turmaSelecionada); // Atualiza a lista de alunos
    } catch (error) {
      console.error('Erro ao adicionar nota:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoFiltro}
        onPress={() => setModalTurmaVisible(true)} // Abre o modal de seleção de turma
      >
        <Text style={styles.textoBotao}>Filtrar por Turma: {turmaSelecionada}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.titulo}>Emails dos Alunos:</Text>
        <View style={styles.listaContainer}>
          <FlatList
            data={alunos}
            renderItem={renderAlunoItem}
            keyExtractor={item => item.id}
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
            <Text style={styles.modalTitulo}>Adicionar Nota para {alunoSelecionado?.NomeAluno}</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a nota"
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
            />
            <Button title="Salvar Nota" onPress={handleNotaSubmit} />
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisible(false)}>
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para seleção de turmas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTurmaVisible}
        onRequestClose={() => setModalTurmaVisible(!modalTurmaVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Selecionar Turma</Text>
            <ScrollView style={styles.turmaScroll}>
              <TouchableOpacity
                style={styles.turmaButton}
                onPress={() => {
                  setTurmaSelecionada('Todas'); // A opção "Todas"
                  setModalTurmaVisible(false);
                }}
              >
                <Text style={styles.textoTurma}>Todas as Turmas</Text>
              </TouchableOpacity>
              {turmas.map((turma) => (
                <TouchableOpacity
                  key={turma.idTurma} // Use o ID da turma como chave
                  style={styles.turmaButton}
                  onPress={() => {
                    setTurmaSelecionada(turma.nomeTurma); // Acesse o nome da turma
                    setModalTurmaVisible(false);
                  }}
                >
                  <Text style={styles.textoTurma}>{turma.nomeTurma}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalTurmaVisible(false)}>
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
    backgroundColor: '#dddddd',
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
    backgroundColor: '#ff6400',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoTurma: {
    color: '#ffffff',
    fontSize: 16,
  },
  botaoFechar: {
    backgroundColor: '#ff6400',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  textoBotaoFechar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default NotasGestao;
