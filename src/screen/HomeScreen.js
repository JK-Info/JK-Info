// HomeScreen.js

import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone

const Avatar = () => {
  return (
    <View>
      <Image source={{ uri: 'https://i.pinimg.com/564x/e6/d0/df/e6d0dfdbf39ec45872bfd55993f6adc1.jpg' }} style={styles.avatarImage} />
    </View>
  );
};

const Divisao = () => {
  return (
    <View style={styles.centroLinha}>
      <View style={styles.linha} />
    </View>
  );
};

const Usuario = () => (
  <View style={styles.containerAvatar}>
    <View style={styles.informacoesPublicacao}>
    <Text>Xereca</Text>
    <Text style={{fontSize: 11}}>Diretor(a)</Text>
    </View>
  </View>
);

const BotaoComentar = ({ onPress }) => (
  <View style={styles.containerBotao}>
    <TouchableOpacity onPress={onPress} style={styles.botao}>
      <Text style={styles.botaoTexto}>Comentar</Text>
    </TouchableOpacity>
  </View>
);

const Curtir = () => (
  <View style={styles.containerCurtir}>
    <TouchableOpacity style={styles.botao} onPress={() => alert('Curtido!')}>
      <Icon name="heart" size={24} color="#FF0000" />
      <Text style={styles.botaoTexto}>Curtir</Text>
    </TouchableOpacity>
  </View>
);

const CommentModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Comentários</Text>
          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxPubli}>
        <View style={styles.indent}>
          <Avatar />
          <Usuario/>
        </View>

        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>
            O Club de Regatas Vasco da Gama, mais conhecido como Vasco da Gama ou simplesmente Vasco, cujo acrônimo é CRVG, é uma entidade sócio-poliesportiva brasileira com sede na cidade do Rio de Janeiro, fundada em 21 de agosto de 1898 por um grupo de remadores.
          </Text>
        </View>

        <View style={styles.bottons}>
          <Curtir />
          <BotaoComentar onPress={toggleModal} />
        </View>
      </View>
      <Divisao />

      <View style={styles.boxPubli}>
        <View style={styles.indent}>
          <Avatar />
          <Usuario/>
        </View>

        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>
            A National Basketball Association (NBA) é a principal liga de basquetebol profissional da América do Norte...
          </Text>
        </View>

        <View style={styles.bottons}>
          <Curtir />
          <BotaoComentar onPress={toggleModal} />
        </View>
      </View>
      <Divisao />

      <CommentModal visible={modalVisible} onClose={toggleModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  boxFeed: {
    backgroundColor: '#f1f1f1',
    margin: 20,
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  textoPubli: {
    fontSize: 16,
    margin: 10,
  },
  boxPubli: {
    justifyContent: 'center',
    margin: 50,
  },
  containerAvatar: {
    width: 70,
  },
  containerBotao: {
    width: 190,
    marginLeft: 10,
    borderRadius: 30,
  },
  containerCurtir: {
    width: 100,
    borderRadius: 30,
  },
  indent: {
    marginLeft: '10%',
    flexDirection: 'row',
  },
  bottons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  centroLinha: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  linha: {
    width: '99%',
    height: 1,
    backgroundColor: '#d3d3d3',
  },
  botao: {
    borderRadius: 30,
    backgroundColor: '#007BFF', // Cor do botão
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5, // Para espaçar o texto do ícone
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
  },
  informacoesPublicacao: {
    marginLeft: '10%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});

export default HomeScreen;
