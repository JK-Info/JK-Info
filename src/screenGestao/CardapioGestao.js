import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { format, getISOWeek } from 'date-fns';
import axios from 'axios';

const CardapioGestao = () => {
  const [cardapio, setCardapio] = useState([
    { id_dia: 1, diaSemana: 'Segunda-feira', prato1: 'Arroz integral', prato2: 'Feijão', prato3: 'Carne suína', prato4: 'Salada', sobremesa: '' },
    { id_dia: 2, diaSemana: 'Terça-feira', prato1: 'Arroz integral', prato2: 'Feijão', prato3: 'Ovo', prato4: '', sobremesa: 'Abacaxi' },
    { id_dia: 3, diaSemana: 'Quarta-feira', prato1: 'Arroz', prato2: 'Feijão preto', prato3: 'Atum', prato4: 'Batata doce', sobremesa: '' },
    { id_dia: 4, diaSemana: 'Quinta-feira', prato1: 'Arroz integral', prato2: 'Feijão', prato3: 'Frango', prato4: 'Legumes', sobremesa: '' },
    { id_dia: 5, diaSemana: 'Sexta-feira', prato1: 'Arroz', prato2: 'Feijão preto', prato3: 'Peixe', prato4: 'Salada', sobremesa: 'Pudim' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [pratos, setPratos] = useState({ prato1: '', prato2: '', prato3: '', prato4: '' });
  const [sobremesa, setSobremesa] = useState('');

  const dataAtual = format(new Date(), 'dd/MM/yyyy');
  const numeroDaSemana = getISOWeek(new Date());

  const abrirModal = (index) => {
    setDiaSelecionado(index);
    const { prato1, prato2, prato3, prato4, sobremesa } = cardapio[index];
    setPratos({ prato1, prato2, prato3, prato4 });
    setSobremesa(sobremesa);
    setModalVisible(true);
  };

  const salvarAlteracoes = async () => {
    const novoCardapio = [...cardapio];
    novoCardapio[diaSelecionado] = {
      ...novoCardapio[diaSelecionado],
      ...pratos,
      sobremesa,
    };

    try {
      const response = await axios.put('http://localhost:3000/putCardapio', {
        id_dia: cardapio[diaSelecionado].id_dia,
        diaSemana: cardapio[diaSelecionado].diaSemana,
        prato1: pratos.prato1,
        prato2: pratos.prato2,
        prato3: pratos.prato3,
        prato4: pratos.prato4,
        sobremesa,
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
            <Text>{item.prato1}</Text>
            {item.prato2 && <Text>{item.prato2}</Text>}
            {item.prato3 && <Text>{item.prato3}</Text>}
            {item.prato4 && <Text>{item.prato4}</Text>}
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

              <TextInput
                style={styles.input}
                value={pratos.prato1}
                onChangeText={(text) => setPratos((prev) => ({ ...prev, prato1: text }))}
              />
              <TextInput
                style={styles.input}
                value={pratos.prato2}
                onChangeText={(text) => setPratos((prev) => ({ ...prev, prato2: text }))}
              />
              <TextInput
                style={styles.input}
                value={pratos.prato3}
                onChangeText={(text) => setPratos((prev) => ({ ...prev, prato3: text }))}
              />
              <TextInput
                style={styles.input}
                value={pratos.prato4}
                onChangeText={(text) => setPratos((prev) => ({ ...prev, prato4: text }))}
              />

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
