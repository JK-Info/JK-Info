import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import { ThemeContext } from '../Components/ThemeContext';

const RedeGestao = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState('Todas');
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const { theme } = useContext(ThemeContext); // Pegando o tema do contexto

  // Função para buscar as turmas
  const fetchTurmas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getturmas');
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  // Função para buscar alunos
  const fetchAlunos = async (turma) => {
    try {
      const response = await axios.get(`http://localhost:3000/getalunos?turma=${turma}`);
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  useEffect(() => {
    fetchTurmas();
    fetchAlunos(''); // Busca todos os alunos ao carregar a página
  }, []);

  useEffect(() => {
    if (turmaSelecionada === 'Todas') {
      fetchAlunos(''); // Busca todos os alunos
    } else {
      fetchAlunos(turmaSelecionada);
    }
  }, [turmaSelecionada]);

  const renderAlunoItem = ({ item }) => (
    <View style={[styles.itemContainer, theme === 'escuro' ? styles.darkItem : styles.lightItem]}>
      <Image
        source={require('../../assets/FotosPerfil/Foto-perfil-Anonima.jpg')}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.alunoNome, theme === 'escuro' ? styles.darkText : styles.lightText]}>
          {item.NomeAluno || 'Nome não disponível'}
        </Text>
        <Text style={[styles.alunoEmail, theme === 'escuro' ? styles.darkText : styles.lightText]}>
          {item.EmailInstitucional || 'Email não disponível'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
      <TouchableOpacity style={styles.botaoFiltro} onPress={() => setModalVisible(true)}>
        <Text style={styles.textoBotao}>Filtrar por Turma: {turmaSelecionada}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <Text style={[styles.titulo, theme === 'escuro' ? styles.darkText : styles.lightText]}>
          Emails dos Alunos:
        </Text>
        <View style={styles.listaContainer}>
          <FlatList
            data={alunos}
            renderItem={renderAlunoItem}
            keyExtractor={(item) => item.id}
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
          <View style={[styles.modalContent, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
            <Text style={[styles.modalTitulo, theme === 'escuro' ? styles.darkText : styles.lightText]}>
              Selecionar Turma
            </Text>
            <ScrollView style={styles.turmaScroll}>
              <TouchableOpacity
                style={styles.turmaButton}
                onPress={() => {
                  setTurmaSelecionada('Todas');
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textoTurma}>Todas as Turmas</Text>
              </TouchableOpacity>
              {turmas.map((turma) => (
                <TouchableOpacity
                  key={turma.idTurma}
                  style={styles.turmaButton}
                  onPress={() => {
                    setTurmaSelecionada(turma.nomeTurma);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textoTurma}>{turma.nomeTurma}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisible(false)}>
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
  },
  darkTheme: {
    backgroundColor: '#292929',
  },
  lightTheme: {
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
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#333',
  },
  listaContainer: {
    backgroundColor: '#a0a0a0',
    borderRadius: 8,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#dddddd',
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  darkItem: {
    backgroundColor: '#1f1f1f',
  },
  lightItem: {
    backgroundColor: '#ffffff',
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
  },
  alunoEmail: {
    fontSize: 14,
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
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoFechar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RedeGestao;
