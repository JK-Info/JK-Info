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

// Componente de Curtir
const CurtirComentario = ({ count, liked, onPress }) => (
  <View style={styles.containerCurtir}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="heart" size={24} color={liked ? '#FF0000' : '#000'} />
    </TouchableOpacity>
    <Text style={styles.curtidasTexto}>{count}</Text>
  </View>
);

// Componente Modal de Comentários
const CommentModal = ({ visible, onClose, comments, onCommentAdded, publicacaoId }) => {
  const [textoComentario, setTextoComentario] = useState('');

  const handleSendComment = async () => {
    if (textoComentario.trim()) {
        try {
            // Faz uma requisição para buscar os dados do usuário com ID 21
            const response = await axios.get(`http://localhost:3000/getusuario/21`);
            const usuario = response.data; // Supondo que a resposta contenha as informações do usuário
            const nomeUsuario = usuario.nome; // Ajuste conforme a estrutura de retorno da sua API

            // Envia o comentário com o ID fixo do usuário 21
            await axios.post('http://localhost:3000/postcomentario', {
                text: textoComentario,
                Publicacao_idPublicacao: publicacaoId,
                Pessoa_id: 21, // ID do usuário logado
            });

            // Atualiza a lista de comentários na tela com o nome correto do usuário
            onCommentAdded({ texto: textoComentario, nome_comentador: nomeUsuario, num_likes: 0 });
            
            setTextoComentario(''); // Limpa o campo de texto após enviar
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            Alert.alert('Erro', 'Falha ao enviar o comentário.');
        }
    } else {
        Alert.alert('Atenção', 'Por favor, insira um comentário.');
    }
};

const handleLikeComment = async (commentId) => {
  const isLiked = comments.find(comment => comment.idComentario === commentId).liked || false;
  try {
    const response = await axios.post('http://localhost:3000/like/comentario', {
      idComentario: commentId,
      liked: !isLiked,
      userId: 21, // ID do usuário logado
    });

    const newCount = response.data.newCount; // Supondo que a API retorne o novo número de curtidas

    // Atualizar a contagem de curtidas localmente
    setSelectedComments((prevComments) =>
      prevComments.map(comment =>
        comment.idComentario === commentId ? { ...comment, num_likes: newCount, liked: !isLiked } : comment
      )
    );
  } catch (error) {
    console.error('Erro ao curtir comentário:', error);
    Alert.alert('Erro', 'Falha ao curtir o comentário. Tente novamente.');
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
          {Array.isArray(comments) && comments.map((comment) => (
              <View key={comment.idComentario} style={styles.comentarioContainer}>
                <Image source={fotoPerfilAnonima} style={styles.avatarComment} />
                <View style={styles.comentarioTextoContainer}>
                  <Text style={styles.nomeAutor}>{comment.nome_comentador}</Text>
                  <Text style={styles.comentarioTexto}>{comment.texto}</Text>
                </View>
                <CurtirComentario
                  count={comment.num_likes}
                  liked={comment.liked}
                  onPress={() => handleLikeComment(comment.idComentario)}
                />
              </View>
            ))}
          </ScrollView>
          <TextInput 
            style={styles.input} 
            placeholder="Escreva um comentário..." 
            value={textoComentario}
            onChangeText={setTextoComentario}
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
  const [selectedComments, setSelectedComments] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [likes, setLikes] = useState({});
  const [currentPostId, setCurrentPostId] = useState(null);
  
  const userId = 21; // User ID should be dynamic based on login context

  const fetchPublicacoes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getpublicacao');
      setPublicacoes(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3000/getcomentarios/${postId}`);
      setSelectedComments(response.data); // Atualiza o estado com os comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os comentários.');
    }
  };

  useEffect(() => {
    fetchPublicacoes();
  }, []);

  const handleLike = async (postId) => {
    const isLiked = likes[postId] || false;
    setLikes((prev) => ({ ...prev, [postId]: !isLiked }));

    try {
      const response = await axios.post('http://localhost:3000/like', {
        idPublicacao: postId,
        liked: !isLiked,
        userId,
      });

      const newCount = response.data.newCount;
      setPublicacoes((prev) => prev.map(pub => 
        pub.idPublicacao === postId ? { ...pub, quantidade_curtidas: newCount } : pub
      ));
    } catch (error) {
      console.error('Erro ao curtir a publicação:', error);
      setLikes((prev) => ({ ...prev, [postId]: isLiked })); // Reverte o like em caso de erro
      Alert.alert('Erro', 'Falha ao curtir a publicação. Tente novamente.');
    }
  };

  const handleCommentUpdate = (newComment) => {
    setSelectedComments(prev => [...prev, newComment]);
  };

  const handleCreatePost = async () => {
    if (newPostText.trim()) {
      try {
        await axios.post('http://localhost:3000/postpublicacao', {
          text: newPostText,
          userId: 21
        });
        setNewPostText('');
        Alert.alert('Sucesso', 'Publicação criada com sucesso!');
        fetchPublicacoes(); // Refresh publicações after creating a new post
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
        count={pub.quantidade_curtidas}
        liked={likes[pub.idPublicacao]}
        onPress={() => handleLike(pub.idPublicacao)}
      />
      <BotaoComentar onPress={async () => { 
        await fetchComments(pub.idPublicacao); // Buscar comentários ao abrir o modal
        setCurrentPostId(pub.idPublicacao); // Define o ID da publicação atual
        setModalVisible(true);
      }} comentarioCount={pub.quantidade_comentarios} />
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
        comments={selectedComments}
        onCommentAdded={handleCommentUpdate}
        publicacaoId={currentPostId}
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