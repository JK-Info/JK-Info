import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Avatar = () => (
  <View>
    <Image source={{ uri: 'https://i.pinimg.com/564x/e6/d0/df/e6d0dfdbf39ec45872bfd55993f6adc1.jpg' }} style={styles.avatarImage} />
  </View>
);

const Divisao = () => (
  <View style={styles.centroLinha}>
    <View style={styles.linha} />
  </View>
);

const Usuario = ({ nome, cargo }) => (
  <View style={styles.containerAvatar}>
    <View style={styles.informacoesPublicacao}>
      <Text>{nome}</Text>
      <Text style={{ fontSize: 11 }}>{cargo}</Text>
    </View>
  </View>
);

const BotaoComentar = ({ onPress, comentarioCount }) => (
  <View style={styles.containerBotao}>
    <TouchableOpacity onPress={onPress} style={styles.botao}>
      <Text style={styles.botaoTexto}>Comentar ({comentarioCount})</Text>
    </TouchableOpacity>
  </View>
);

const Curtir = ({ onPress }) => (
  <View style={styles.containerCurtir}>
    <TouchableOpacity onPress={onPress} style={styles.botao}>
      <Icon name="heart" size={24} color="#FF0000" />
      <Text style={styles.botaoTexto}>Curtir</Text>
    </TouchableOpacity>
  </View>
);

const CommentModal = ({ visible, onClose, comments, onSendComment }) => {
  const [comentario, setComentario] = useState('');

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
          
          <ScrollView style={styles.comentariosContainer}>
            {comments.map((comment, index) => (
              <View key={index} style={styles.comentarioContainer}>
                <Image source={{ uri: comment.author.photo }} style={styles.avatarComment} />
                <View style={styles.comentarioTextoContainer}>
                  <Text style={styles.nomeAutor}>{comment.author.name}</Text>
                  <Text style={styles.comentarioTexto}>{comment.text}</Text>
                </View>
                <Curtir onPress={() => alert('Curtido!')} />
              </View>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            value={comentario}
            onChangeText={setComentario}
          />
          <TouchableOpacity onPress={() => { onSendComment(comentario); setComentario(''); }} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Post = ({ text, image, comments, onCommentPress }) => (
  <View style={styles.boxPubli}>
    <View style={styles.indent}>
      <Avatar />
      <Usuario nome="Xereca" cargo="Diretor(a)" />
    </View>

    <View style={styles.boxFeed}>
      <Text style={styles.textoPubli}>{text}</Text>
      {image && <Image source={{ uri: image }} style={styles.postImage} />}
    </View>

    <View style={styles.bottons}>
      <Curtir />
      <BotaoComentar onPress={onCommentPress} comentarioCount={comments.length} />
    </View>
  </View>
);

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const toggleModal = () => setModalVisible(!modalVisible);

  const handleSendComment = (commentText) => {
    if (commentText) {
      const newComment = {
        text: commentText,
        author: {
          name: 'Xereca',
          photo: 'https://i.pinimg.com/564x/e6/d0/df/e6d0dfdbf39ec45872bfd55993f6adc1.jpg', // Exemplo de foto
        },
      };
      setComments([...comments, newComment]);
      toggleModal();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Barra de Pesquisa */}
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Postagem Apenas de Texto */}
      <Post 
        text="O Club de Regatas Vasco da Gama, mais conhecido como Vasco da Gama ou simplesmente Vasco, cujo acrônimo é CRVG, é uma entidade sócio-poliesportiva brasileira com sede na cidade do Rio de Janeiro, fundada em 21 de agosto de 1898 por um grupo de remadores."
        comments={comments}
        onCommentPress={toggleModal}
      />
      <Divisao />

      {/* Postagem com Texto e Imagem */}
      <Post 
        text="A National Basketball Association (NBA) é a principal liga de basquetebol profissional da América do Norte..."
        image="https://de2.sportal365images.com/process/smp-betway-images/betway.com/28072023/e7737cea-2040-48fd-a041-c6ec11f367a6.jpg"
        comments={comments}
        onCommentPress={toggleModal}
      />
      <Divisao />

      <CommentModal visible={modalVisible} onClose={toggleModal} comments={comments} onSendComment={handleSendComment} />
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
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    paddingHorizontal: 10,
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
  postImage: {
    width: '99%',
    height: 600, // Ajuste conforme necessário
    borderRadius: 10,
    marginTop: 10,
    margin: 5,
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
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
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
  sendButton: {
    backgroundColor: '#28A745',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    borderRadius: 30
  },
  closeButton: {
    backgroundColor: '#007BFF',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
  },
  comentarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  comentarioTexto: {
    flex: 1,
  },
  comentariosContainer: {
    maxHeight: 200, // Ajuste conforme necessário
    marginBottom: 10,
  },
  informacoesPublicacao: {
    marginLeft: '10%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  avatarComment: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  comentarioTextoContainer: {
    flex: 1,
  },
  nomeAutor: {
    fontSize: 12,
    color: '#555',
  },
});

export default HomeScreen;
