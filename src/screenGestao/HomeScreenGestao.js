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

  const handleSendComment = () => {
    if (comentario.trim()) {
      const newComment = {
        text: comentario,
        author: {
          name: 'User',
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

  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].liked = !updatedComments[index].liked;
    updatedComments[index].likeCount += updatedComments[index].liked ? 1 : -1;
    onSendComment(updatedComments);
  };

  const handleLongPressComment = (index) => {
    Alert.alert(
      'Excluir Comentário',
      'Você deseja excluir este comentário?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado') },
        { text: 'Excluir', onPress: () => {
          const updatedComments = comments.filter((_, i) => i !== index);
          onSendComment(updatedComments);
        }},
      ],
      { cancelable: true }
    );
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
                onLongPress={() => handleLongPressComment(index)} 
                style={styles.comentarioContainer}
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

const Post = ({ text, image, comments, onCommentPress, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikePost = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentPress = () => {
    onCommentPress(comments); // Passa os comentários ao modal
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
        <BotaoComentar onPress={handleCommentPress} comentarioCount={comments.length} />
        
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreenGestao = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]); // Inicialize com um array vazio

  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleCreatePostModal = () => setCreatePostModalVisible(!createPostModalVisible);

  const handleCommentUpdate = (index, newComments) => {
    const updatedPosts = [...posts];
    updatedPosts[index].comments = newComments;
    setPosts(updatedPosts);
  };

  const handleCreatePost = () => {
    if (newPostText.trim() || newPostImage) {
      const newPost = {
        text: newPostText,
        image: newPostImage,
        comments: [],
      };
      setPosts([newPost, ...posts]); // Adiciona novo post no topo
      setNewPostText('');
      setNewPostImage('');
      toggleCreatePostModal(); // Fecha o modal após criar o post
    }
  };

  const handleDeletePost = (index) => {
    Alert.alert(
      'Excluir Publicação',
      'Você deseja excluir esta publicação?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado') },
        { text: 'Excluir', onPress: () => {
          const updatedPosts = posts.filter((_, i) => i !== index);
          setPosts(updatedPosts);
        }},
      ],
      { cancelable: true }
    );
  };

  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView style={styles.scrollView}>
        {filteredPosts.map((post, index) => (
          <Post 
            key={index}
            text={post.text}
            image={post.image}
            comments={post.comments}
            onCommentPress={() => {
              setComments(post.comments);
              toggleModal();
            }}
            onDelete={() => handleDeletePost(index)} // Passa o índice correto
          />
        ))}
      </ScrollView>

      <CommentModal 
        visible={modalVisible} 
        onClose={toggleModal} 
        comments={comments} 
        onSendComment={(newComments) => {
          setComments(newComments);
          const postIndex = posts.findIndex(post => post.comments === comments);
          if (postIndex !== -1) {
            handleCommentUpdate(postIndex, newComments);
          }
        }} 
      />
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={toggleCreatePostModal} // Abre o modal de criação de publicação
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={createPostModalVisible}
        onRequestClose={toggleCreatePostModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Criar Publicação</Text>

            <TextInput
              style={styles.newPostInput}
              placeholder="Digite sua publicação..."
              value={newPostText}
              onChangeText={setNewPostText}
            />

            <TouchableOpacity onPress={handleCreatePost} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Publicar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleCreatePostModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
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
  scrollView: {
    flex: 1,
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
    marginBottom: 10,
  },
  sendButtonText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#ff6400',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6347',
    borderRadius: 50,
    padding: 15,
    elevation: 3,
  },
  newPostInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default HomeScreenGestao;