import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import fotoPerfilAnonima from '../../assets/FotosPerfil/Foto-perfil-Anonima.jpg';

const Stack = createStackNavigator();

const Avatar = () => (
  <Image source={fotoPerfilAnonima} style={styles.avatarImage} />
);

const Usuario = ({ nome, cargo }) => (
  <View style={styles.informacoesPublicacao}>
    <Text>{nome}</Text>
    <Text style={{ fontSize: 11 }}>{cargo}</Text>
  </View>
);

const BotaoComentar = ({ onPress, comentarioCount }) => (
  <View style={styles.containerBotao}>
    <TouchableOpacity onPress={onPress} style={styles.botao}>
      <Text style={styles.botaoTexto}>Comentar ({comentarioCount})</Text>
    </TouchableOpacity>
  </View>
);

const Curtir = ({ count, liked, onPress }) => (
  <View style={styles.containerCurtir}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="heart" size={24} color={liked ? '#FF0000' : '#000'} />
    </TouchableOpacity>
    <Text style={styles.curtidasTexto}>{count}</Text>
  </View>
);

const CommentModal = ({ visible, onClose, comments, onSendComment }) => {
  const [comentario, setComentario] = useState('');

  const handleSendComment = () => {
    if (comentario.trim()) {
      const newComment = {
        text: comentario,
        author: {
          name: 'Aluno',
          photo: fotoPerfilAnonima, // Use a imagem importada aqui
        },
        liked: false,
        likeCount: 0,
      };
      onSendComment([...comments, newComment]);
      setComentario('');
      onClose();
    }
  };

  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].liked = !updatedComments[index].liked;
    updatedComments[index].likeCount += updatedComments[index].liked ? 1 : -1;
    onSendComment(updatedComments);
  };

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
                <Image source={comment.author.photo} style={styles.avatarComment} />
                <View style={styles.comentarioTextoContainer}>
                  <Text style={styles.nomeAutor}>{comment.author.name}</Text>
                  <Text style={styles.comentarioTexto}>{comment.text}</Text>
                </View>
                <Curtir 
                  count={comment.likeCount} 
                  liked={comment.liked} 
                  onPress={() => handleLikeComment(index)} 
                />
              </View>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            value={comentario}
            onChangeText={setComentario}
          />
          <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
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

const Post = ({ text, image, comments, onCommentPress }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikePost = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <View style={styles.boxPubli}>
      <View style={styles.indent}>
        <Avatar />
        <Usuario nome="Diretor" cargo="Diretor(a)" />
      </View>

      <View style={styles.boxFeed}>
        <Text style={styles.textoPubli}>{text}</Text>
        {image && <Image source={{ uri: image }} style={styles.postImage} />}
      </View>

      <View style={styles.bottons}>
        <Curtir count={likeCount} liked={liked} onPress={handleLikePost} />
        <BotaoComentar onPress={onCommentPress} comentarioCount={comments.length} />
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Post 
        text="O Club de Regatas Vasco da Gama, mais conhecido como Vasco da Gama ou simplesmente Vasco, cujo acrônimo é CRVG, é uma entidade sócio-poliesportiva brasileira com sede na cidade do Rio de Janeiro, fundada em 21 de agosto de 1898 por um grupo de remadores."
        comments={comments}
        onCommentPress={toggleModal}
      />

      <Post 
        text="A National Basketball Association (NBA) é a principal liga de basquetebol profissional da América do Norte..."
        image="https://de2.sportal365images.com/process/smp-betway-images/betway.com/28072023/e7737cea-2040-48fd-a041-c6ec11f367a6.jpg"
        comments={comments}
        onCommentPress={toggleModal}
      />

      <CommentModal 
        visible={modalVisible} 
        onClose={toggleModal} 
        comments={comments} 
        onSendComment={setComments} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
    borderRadius: 30,
    margin: 20,
    paddingHorizontal: 10,
  },
  boxFeed: {
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  textoPubli: {
    fontSize: 16,
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  boxPubli: {
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'column',
  },
  informacoesPublicacao: {
    marginLeft: 10,
    marginBottom: 10,
  },
  containerBotao: {
    width: '90%',
    marginLeft: 10,
    borderRadius: 30,
  },
  containerCurtir: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
  },
  curtidasTexto: {
    marginLeft: 5,
    fontSize: 16,
  },
  indent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  bottons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  botao: {
    borderRadius: 30,
    backgroundColor: '#00527C',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
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
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  comentariosContainer: {
    maxHeight: 300,
  },
  comentarioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  avatarComment: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  comentarioTextoContainer: {
    flex: 1,
  },
  nomeAutor: {
    fontWeight: 'bold',
  },
  comentarioTexto: {
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#00527C',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#ff6400',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default HomeScreen;
