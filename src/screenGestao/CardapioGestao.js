import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { format, getISOWeek } from 'date-fns';
import axios from 'axios';

const CardapioGestao = () => {
  const [cardapio, setCardapio] = useState([
    { diaSemana: 'Segunda-feira', prato: ['Arroz integral', 'Feijão', 'Carne suína', 'Salada'], sobremesa: '' },
    { diaSemana: 'Terça-feira', prato: ['Arroz integral', 'Feijão', 'Ovo'], sobremesa: 'Abacaxi' },
    { diaSemana: 'Quarta-feira', prato: ['Arroz', 'Feijão preto', 'Atum', 'Batata doce'], sobremesa: '' },
    { diaSemana: 'Quinta-feira', prato: ['Arroz integral', 'Feijão', 'Frango', 'Legumes'], sobremesa: '' },
    { diaSemana: 'Sexta-feira', prato: ['Arroz', 'Feijão preto', 'Peixe', 'Salada'], sobremesa: 'Pudim' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [prato, setprato] = useState([]);
  const [sobremesa, setSobremesa] = useState('');

  const dataAtual = format(new Date(), 'dd/MM/yyyy');
  const numeroDaSemana = getISOWeek(new Date());

  const abrirModal = (index) => {
    setDiaSelecionado(index);
    setprato(cardapio[index].prato);
    setSobremesa(cardapio[index].sobremesa);
    setModalVisible(true);
  };

  const salvarAlteracoes = async () => {
    const novoCardapio = [...cardapio];
    novoCardapio[diaSelecionado].prato = prato;
    novoCardapio[diaSelecionado].sobremesa = sobremesa;
  
    try {
      const response = await axios.put('http://localhost:3000/putCardapio', {
        diaSemana: cardapio[diaSelecionado].diaSemana, // Dia da semana
        prato: prato, // Array com os pratos
        sobremesa: sobremesa // Sobremesa (pode ser vazio)
      });
  
      if (response.status === 200) {
        setCardapio(novoCardapio);
        setModalVisible(false);
        Alert.alert('Sucesso', 'Cardápio atualizado com sucesso');
  
        obterCardapioAtualizado(); // Atualiza o cardápio no front-end
      } else {
        throw new Error('Falha ao atualizar o cardápio');
      }
    } catch (error) {
      console.error('Erro ao atualizar cardápio:', error);
      setModalVisible(false);
      Alert.alert('Erro', 'Falha ao atualizar o cardápio. Tente novamente');
    }
  };

  const obterCardapioAtualizado = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getCardapio');

      if (response.status === 200) {
        setCardapio(response.data);
      } else {
        Alert.alert('Aviso', 'Cardápio não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter cardápio:', error);
      Alert.alert('Erro', 'Falha ao obter o cardápio. Tente novamente');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Semana Atual: {numeroDaSemana}</Text>
        <Text style={styles.headerText}>Data: {dataAtual}</Text>
      </View>

      {cardapio.map((item, index) => (
        <View key={index} style={styles.weekDayContainer}>
          <View style={styles.fundoTitulo}>
            <Text style={styles.weekDay}>{item.diaSemana}</Text>
            <TouchableOpacity onPress={() => abrirModal(index)} style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuContainer}>
            {item.prato.map((prato, i) => (
              <Text key={i}>{prato}</Text>
            ))}
            {item.sobremesa ? <Text style={styles.dessert}>Sobremesa: {item.sobremesa}</Text> : null}
          </View>
        </View>
      ))}

      {/* Modal para edição do cardápio */}
      {diaSelecionado !== null && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Cardápio</Text>

              {prato.map((valor, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  value={valor}
                  onChangeText={(text) => {
                    const novosPratos = [...prato]; // Cria uma cópia do array de pratos
                    novosPratos[index] = text; // Atualiza o índice correto
                    setprato(novosPratos); // Atualiza o estado
                  }}
                />
              ))}

              <TextInput
                style={styles.input}
                placeholder="Sobremesa"
                value={sobremesa}
                onChangeText={setSobremesa}
              />

              <TouchableOpacity style={styles.saveButton} onPress={salvarAlteracoes}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weekDayContainer: {
    marginBottom: 20,
  },
  fundoTitulo: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekDay: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  dessert: {
    fontStyle: 'italic',
  },
  editButton: {
    backgroundColor: '#00527C',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#00527C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ff6400',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default CardapioGestao;