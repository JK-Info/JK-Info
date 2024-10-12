import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import fotoPerfilAnonima from '../../assets/FotosPerfil/Foto-perfil-Anonima.jpg';

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
  const currentUserName = 'Aluno'; // Substitua pelo identificador do usuário atual

  const handleSendComment = () => {
    if (comentario.trim()) {
      const newComment = {
        text: comentario,
        author: {
          name: currentUserName,
          photo: fotoPerfilAnonima,
        },
        liked: false,
        likeCount: 0,
      };
      onSendComment([...comments, newComment]);
      setComentario('');
      onClose();
    }
  };

  const handleLongPressComment = (comment) => {
    if (comment.author.name === currentUserName) {
      Alert.alert(
        'Excluir Comentário',
        'Você deseja excluir este comentário?',
        [
          { text: 'Cancelar', onPress: () => console.log('Cancelado') },
          { text: 'Excluir', onPress: () => excluirComment(comment) },
        ],
        { cancelable: true }
      );
    }
  };

  const excluirComment = (commentToRemove) => {
    const updatedComments = comments.filter(comment => comment !== commentToRemove);
    onSendComment(updatedComments);
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
              <TouchableOpacity 
                key={index} 
                style={styles.comentarioContainer} 
                onLongPress={() => handleLongPressComment(comment)}
              >
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
              </TouchableOpacity>
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
  const [comments, setComments] = useState([
    {
      text: 'Ótima publicação!',
      author: {
        name: 'User',
        photo: fotoPerfilAnonima,
      },
      liked: false,
      likeCount: 0,
    },
    {
      text: 'Muito interessante, obrigado por compartilhar!',
      author: {
        name: 'User',
        photo: fotoPerfilAnonima,
      },
      liked: false,
      likeCount: 0,
    },
  ]);
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

      {/* Outros Posts podem ser adicionados aqui */}
      
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
  searchInput: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  boxPubli: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  indent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxFeed: {
    marginBottom: 10,
  },
  textoPubli: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  bottons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  informacoesPublicacao: {
    marginLeft: 10,
  },
  containerBotao: {
    flex: 1,
    alignItems: 'flex-end',
  },
  botao: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#00527C',
    borderRadius: 20,
  },
  botaoTexto: {
    color: '#fff',
  },
  containerCurtir: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  curtidasTexto: {
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  comentariosContainer: {
    maxHeight: 200,
  },
  comentarioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avatarComment: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  comentarioTextoContainer: {
    flex: 1,
    marginRight: 10,
  },
  nomeAutor: {
    fontWeight: 'bold',
  },
  comentarioTexto: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#00527C',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ff6400',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default HomeScreen;
