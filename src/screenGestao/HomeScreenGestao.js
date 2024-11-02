import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, TextInput, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import fotoPerfilAnonima from '../../assets/FotosPerfil/Foto-perfil-Anonima.jpg';

// Componente de Avatar
const Avatar = () => (
  <Image source={fotoPerfilAnonima} style={styles.avatarImage} />
);

// Componente de Usuário
const Usuario = ({ nome, cargo }) => (
  <View style={styles.informacoesPublicacao}>
    <Text>{nome}</Text>
    <Text style={{ fontSize: 11 }}>{cargo}</Text>
  </View>
);

// Componente de Botão de Comentar
const BotaoComentar = ({ onPress, comentarioCount }) => (
  <View style={styles.containerBotao}>
    <TouchableOpacity onPress={onPress} style={styles.botao}>
      <Text style={styles.botaoTexto}>Comentar ({comentarioCount})</Text>
    </TouchableOpacity>
  </View>
);

// Componente de Curtir
const Curtir = ({ count, liked, onPress }) => (
  <View style={styles.containerCurtir}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="heart" size={24} color={liked ? '#FF0000' : '#000'} />
    </TouchableOpacity>
    <Text style={styles.curtidasTexto}>{count}</Text>
  </View>
);

// Componente Modal de Comentários
const CommentModal = ({ visible, onClose, comments, onSendComment }) => {
  const [comentario, setComentario] = useState('');

  const handleSendComment = () => {
    if (comentario.trim()) {
      onSendComment(comentario);
      setComentario('');
      onClose();
    }
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
                <Curtir count={comment.likeCount} liked={comment.liked} onPress={() => { /* Implementar lógica de like */ }} />
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

// Componente principal HomeScreenGestao
const HomeScreenGestao = () => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [likes, setLikes] = useState({});

  const handleLike = async (postId) => {
    const isLiked = likes[postId] || false; // Verifica se já está curtido
    const newLikes = { ...likes, [postId]: !isLiked }; // Atualiza o estado de curtidas
    setLikes(newLikes);
  
    // Envie a requisição para adicionar/remover a curtida na API
    try {
      const response = await axios.post('http://localhost:3000/like', {
        idPublicacao: postId,
        liked: !isLiked, // Envia o novo estado de curtida
        userId: 21 // O ID do usuário que está curtindo
      });
      
      // Atualiza o count de likes após a resposta
      const newCount = response.data.newCount;
      setPublicacoes(prevPublicacoes =>
        prevPublicacoes.map(pub =>
          pub.idPublicacao === postId ? { ...pub, quantidade_curtidas: newCount } : pub
        )
      );
    } catch (error) {
      console.error('Erro ao curtir a publicação:', error);
      // Reverter a alteração no estado em caso de erro
      setLikes(likes);
      Alert.alert('Erro', 'Falha ao curtir a publicação. Tente novamente.');
    }
  };
  
  // ID do usuário logado
  const userId = 21;

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getpublicacao');
        setPublicacoes(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
      }
    };

    fetchPublicacoes();
  }, []);

  const handleCommentUpdate = (newComments) => {
    setComments(newComments);
  };

  const handleCreatePost = async () => {
    if (newPostText.trim()) {
      const newPost = {
        text: newPostText,
        userId,
      };

      try {
        await axios.post('http://localhost:3000/postpublicacao', newPost);
        setNewPostText('');
        Alert.alert('Sucesso', 'Publicação criada com sucesso!');
      } catch (error) {
        console.error('Erro ao criar publicação:', error);
        Alert.alert('Erro', 'Falha ao criar publicação.');
      }
    }
  };

  const renderPublicacao = (pub) => (
    <View style={styles.boxPubli} key={pub.idPublicacao}>
      <View style={styles.indent}>
        <Avatar />
        <Usuario nome={pub.nome_pessoa} cargo={pub.cargo} />
      </View>
      <Text>{pub.publicacao_descricao}</Text>
      <Curtir
        count={pub.quantidade_curtidas} // Supondo que você tenha essa contagem na resposta da API
        liked={likes[pub.idPublicacao]} // Usando o estado para saber se foi curtido
        onPress={() => handleLike(pub.idPublicacao)} // Chama a função de curtir
      />
      <BotaoComentar onPress={() => { setComments(pub.comentarios); setModalVisible(true); }} comentarioCount={pub.quantidade_comentarios} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {publicacoes.map(renderPublicacao)}
      </ScrollView>
      <TouchableOpacity onPress={handleCreatePost} style={styles.createPostButton}>
        <Text style={styles.createPostButtonText}>Criar Publicação</Text>
      </TouchableOpacity>
      <CommentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        comments={comments}
        onSendComment={handleCommentUpdate}
      />
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
    height: 500,
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#00527C',
    borderRadius: 10,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  sendButtonText: {
    color: 'white',
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#ff6400',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#ff6400',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  newPostInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    color: '#00527C',
  },
});

export default HomeScreenGestao;