import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
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

const HomeScreenGestao = () => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);
  
  // Substitua este valor pelo ID do usuário logado
  const userId = 1; 

  useEffect(() => {
    const fetchPublicacoes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getpublicacao');
        setPublicacoes(response.data.data);
        const initialLikes = {};
        response.data.data.forEach((item) => {
          initialLikes[item.idPublicacao] = {
            liked: false,
            count: item.quantidade_likes,
          };
        });
        setLikes(initialLikes);
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
      }
    };

    fetchPublicacoes();
  }, []);

  const fetchComments = async (idPublicacao) => {
    try {
      const response = await axios.get(`http://localhost:3000/comentarios/${idPublicacao}`);
      setComments(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const handleLike = async (idPublicacao) => {
    try {
        const liked = likes[idPublicacao].liked;
        console.log(`Curtindo publicação: ${idPublicacao}, estado atual: ${liked}`); // Log para depuração
        const response = await axios.post('http://localhost:3000/like', { 
            idPublicacao, 
            liked: !liked, 
            userId: 21 // Adicione o userId aqui
        });

        console.log('Resposta do servidor:', response.data); // Log para depuração

        const newCount = response.data.newCount; 
        setLikes({
            ...likes,
            [idPublicacao]: { liked: !liked, count: newCount },
        });
    } catch (error) {
        console.error('Erro ao atualizar like:', error);
    }
};

  const handleSendComment = async () => {
    if (newComment.trim() === '') return;

    try {
      await axios.post('http://localhost:3000/postcomentario', { 
        idPublicacao: selectedPublicationId, 
        text: newComment,
        userId // Enviar o ID do usuário, se necessário
      });

      await fetchComments(selectedPublicationId);
      setNewComment('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  const renderPublicacao = ({ item }) => (
    <View style={styles.boxPubli}>
      <View style={styles.indent}>
        <Avatar />
        <Usuario nome={item.nome_pessoa} cargo={item.cargo} />
      </View>
      <View style={styles.boxFeed}>
        <Text style={styles.textoPubli}>{item.publicacao_descricao}</Text>
      </View>
      <View style={styles.bottons}>
        <Curtir 
          count={likes[item.idPublicacao]?.count || 0} 
          liked={likes[item.idPublicacao]?.liked || false} 
          onPress={() => handleLike(item.idPublicacao)} 
        />
        <BotaoComentar onPress={() => {
          setSelectedPublicationId(item.idPublicacao);
          fetchComments(item.idPublicacao);
          setModalVisible(true);
        }} comentarioCount={item.quantidade_comentarios} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={publicacoes}
        renderItem={renderPublicacao}
        keyExtractor={(item) => item.idPublicacao.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setComments([]); // Limpa os comentários ao fechar o modal
          setNewComment(''); // Limpa o novo comentário ao fechar o modal
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Comentários</Text>
            <ScrollView style={styles.comentariosContainer}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.comentarioContainer}>
                  <Image source={fotoPerfilAnonima} style={styles.avatarComment} />
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
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSendComment}
            >
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#00527C',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#00527C',
  },
});

export default HomeScreenGestao;