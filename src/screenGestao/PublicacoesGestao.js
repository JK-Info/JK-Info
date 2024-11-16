  import React, { useState, useEffect, useContext } from 'react';
  import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, TextInput, Alert } from 'react-native';
  import axios from 'axios';
  import fotoPerfilAnonima from '../../assets/FotosPerfil/Foto-perfil-Anonima.jpg';
  import { ThemeContext } from '../Components/ThemeContext';
  import Icon from 'react-native-vector-icons/Ionicons';

  // Componente de Avatar
  const Avatar = () => (
    <Image source={fotoPerfilAnonima} style={styles.avatarImage} />
  );

  // Componente de Usuário
  const Usuario = ({ nome, cargo, theme }) => (
    <View style={styles.informacoesPublicacao}>
      <Text style={theme === 'escuro' ? styles.darkText : styles.lightText}>{nome}</Text>
      <Text style={[{ fontSize: 11 }, theme === 'escuro' ? styles.darkText : styles.lightText]}>{cargo}</Text>
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

  const BotaoExcluir = ({ onPress }) => (
    <View style={styles.containerBotaoExcluir}>
      <TouchableOpacity onPress={onPress} style={styles.botaoExcluir}>
        <Text style={styles.botaoTexto}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const Curtir = ({ count, liked, onPress, theme }) => (
    <View style={[styles.containerCurtir, theme === 'escuro' ? styles.darkText : styles.lightText]}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={liked ? "heart" : "heart-outline"} // Alterna entre coração preenchido e contornado
          size={24}
          color={liked ? '#FF0000' : '#FF0000'} // Mantém a borda vermelha nos dois estados
        />
      </TouchableOpacity>
      <Text style={[styles.curtidasTexto, theme === 'escuro' ? { color: '#FFFFFF' } : styles.lightText]}>
        {count}
      </Text>
    </View>
  );
  
  const CurtirComentario = ({ count, liked, onPress, theme }) => (
    <View style={[styles.containerCurtir, theme === 'escuro' ? styles.darkText : styles.lightText]}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={liked ? "heart" : "heart-outline"} // Alterna entre coração preenchido e coração com borda
          size={24}
          color={liked ? '#FF0000' : '#FF0000'} // O coração sempre terá a borda vermelha
        />
      </TouchableOpacity>
      <Text style={[styles.curtidasTexto, theme === 'escuro' ? { color: '#FFFFFF' } : styles.lightText]}>
        {count}
      </Text>
    </View>
  );
  

  // Componente Modal de Comentários
  const CommentModal = ({ visible, onClose, comments, onCommentAdded, publicacaoId }) => {
    const [textoComentario, setTextoComentario] = useState('');
    const { theme } = useContext(ThemeContext); // Acessando o valor do tema

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
    const userId = 21; // Substitua isso pelo ID do usuário logado dinamicamente
  
    try {
      const response = await axios.post('http://localhost:3000/likecomentario', {
        idComentario: commentId,
        liked: !isLiked,
        userId: userId,
      });
  
      const newCount = response.data.newCount;

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
        <View style={[styles.modalContainer, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
          <Text style={[styles.modalTitle, theme === 'escuro' ? styles.darkText : styles.lightText]}>Comentários</Text>
          <ScrollView style={[styles.comentariosContainer, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
            {Array.isArray(comments) && comments.map((comment) => (
              <View key={comment.idComentario} style={[styles.comentarioContainer, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
                <Image source={fotoPerfilAnonima} style={styles.avatarComment} />
                <View style={styles.comentarioTextoContainer}>
                  <Text style={[styles.nomeAutor, theme === 'escuro' ? styles.darkText : styles.lightText]}>{comment.nome_comentador}</Text>
                  <Text style={[styles.comentarioTexto, theme === 'escuro' ? styles.darkText : styles.lightText]}>{comment.texto}</Text>
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
            style={[styles.input, theme === 'escuro' ? styles.darkText : styles.lightText]} 
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
  const PublicacoesGestao = () => {
    const [publicacoes, setPublicacoes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedComments, setSelectedComments] = useState([]);
    const [newPostText, setNewPostText] = useState('');
    const [likes, setLikes] = useState({});
    const [currentPostId, setCurrentPostId] = useState(null);
    const { theme } = useContext(ThemeContext); // Pegando o tema do contexto
    
    const fetchPublicacoes = async () => {
      const idPessoa = 21; // ID fixo, que você pode substituir conforme a lógica do seu sistema.
    
      try {
        // Fazendo a requisição GET para buscar publicações
        const response = await axios.get(`http://localhost:3000/getpublicacaousuario/${idPessoa}`);
        
        // Atualizando o estado com as publicações recebidas
        setPublicacoes(response.data.data); 
      } catch (error) {
        console.error('Erro ao buscar publicações do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar as publicações.');
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
          userId: 21
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

    // Função para excluir publicação
    const handleDeletePost = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:3000/deletepublicacao/${id}`);
        if (response.status === 200) {
          console.log('Publicação excluída com sucesso.');
          // Remove a publicação do estado local
          setPublicacoes((prevPublicacoes) => 
            prevPublicacoes.filter((pub) => pub.idPublicacao !== id)
          );
        }
      } catch (error) {
        console.error('Erro ao excluir publicação:', error);
        Alert.alert('Erro', 'Falha ao excluir a publicação. Tente novamente.');
      }
    };
    

    const handleCreatePost = async () => {
      if (newPostText.trim()) {
        try {
          const response = await axios.post('http://localhost:3000/postpublicacao', {
            descricao: newPostText,
            Pessoa_idPessoa: 21 // Você pode substituir pelo ID real do usuário logado
          });
          console.log('Resposta do servidor:', response.data); 
          setNewPostText('');
          fetchPublicacoes(); // Atualiza a lista de publicações
        } catch (error) {
          console.error('Erro ao criar a publicação:', error);
          Alert.alert('Erro', 'Falha ao criar a publicação.');
        }
      } else {
        Alert.alert('Atenção', 'Digite algo para criar uma publicação.');
      }
    };

    const renderPublicacao = (pub) => (
      <View style={[styles.boxPubli, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]} key={pub.idPublicacao}>
        <View style={styles.indent}>
          <Avatar />
          <Usuario nome={pub.nome_pessoa} cargo={pub.cargo} theme={theme} />
        </View>
        <Text style={theme === 'escuro' ? styles.darkText : styles.lightText}>
        {pub.publicacao_descricao}
        </Text>
        <View style={styles.actionsRow}>
          <Curtir
            count={pub.quantidade_curtidas}
            liked={likes[pub.idPublicacao]}
            onPress={() => handleLike(pub.idPublicacao)}
          />
          <View style={styles.commentDeleteRow}>
            <BotaoComentar
              onPress={async () => {
                await fetchComments(pub.idPublicacao); // Buscar comentários ao abrir o modal
                setCurrentPostId(pub.idPublicacao); // Define o ID da publicação atual
                setModalVisible(true);
              }}
              comentarioCount={pub.quantidade_comentarios}
            />
            <BotaoExcluir onPress={() => handleDeletePost(pub.idPublicacao)} />
          </View>
        </View>
      </View>
    );

    return (
      <View style={[styles.container, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }} // Ajuste o padding para a altura da área de criação de publicações
        >
          {publicacoes.map(renderPublicacao)}
        </ScrollView>
    
        {/* Fixa a área de criação de publicações na parte inferior */}
        <View style={[styles.fixedFooter, theme === 'escuro' ? styles.darkTheme : styles.lightTheme]}>
          <TextInput
            style={[styles.inputPost, theme === 'escuro' ? styles.darkText : styles.lightText]}
            placeholder="Escreva uma publicação..."
            value={newPostText}
            onChangeText={setNewPostText}
          />
          <TouchableOpacity style={styles.sendPostButton} onPress={handleCreatePost}>
            <Text style={styles.sendPostButtonTex}>Publicar</Text>
          </TouchableOpacity>
        </View>
    
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
    actionsRow: {
      flexDirection: 'row',   // Alinha os componentes em uma linha
      justifyContent: 'space-between',  // Distribui os itens igualmente
      alignItems: 'center',   // Alinha verticalmente no centro
      marginTop: 10,    // Ajuste de margem para dar espaço acima
    },
    commentDeleteRow: {
      flexDirection: 'row',   // Alinha comentar e excluir na mesma linha
      alignItems: 'center',   // Alinha verticalmente no centro
      marginLeft: 10,         // Opcional: ajusta o espaço em relação ao botão Curtir
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
    darkTheme: {
      backgroundColor: '#292929', // Fundo escuro para o tema escuro
    },
    lightTheme: {
      backgroundColor: '#f9f9f9', // Fundo claro para o tema claro
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    darkText: {
      color: '#FFFFFF', // Texto claro para o tema escuro
    },
    lightText: {
      color: '#000000', // Texto escuro para o tema claro
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
      justifyContent: 'start'
    },
    containerBotaoExcluir: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'start'
    },
    botao: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#00527C',
      borderRadius: 20,
      margin: 5,
      maxWidth: 100,
      minWidth: 110
    },
    botaoExcluir: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#ff6400',
      borderRadius: 20,
      margin: 5,
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
      borderRadius: 5, // Remove duplicate borderRadius property
      padding: 10,
      marginBottom: 10,
    },
    inputPost:{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5, // Remove duplicate borderRadius property
      padding: 10,
      marginBottom: 10,
    },
    sendButton: {
      backgroundColor: '#00527C',
      borderRadius: 5, // Remove duplicate borderRadius property
      paddingVertical: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    sendButtonText:{
      color: 'white',
    },
    sendPostButton:{
      backgroundColor: '#00527C',
      borderRadius: 5, // Remove duplicate borderRadius property
      paddingVertical: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    sendPostButtonTex: {
      color: 'white',
      color: '#fff',
    },
    sendPostButtonText:{
      color: 'white',
      color: '#fff',
    },
    fixedFooter: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ccc',
      zIndex: 1, // Para garantir que fique acima de outros elementos
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
      bottom: 30,
      right: 30,
      width: 60,
      height: 60,
      backgroundColor: '#007BFF',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingButtonText: {
      color: 'white',
      fontSize: 30,
    },
    createPostButton: {
      backgroundColor: '#00527C',
      borderRadius: 10,
      paddingVertical: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    createPostButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    containerCurtir: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    transparentIcon: {
      // O estilo faz com que apenas a borda do coração apareça
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    darkText: {
      color: '#FFFFFF', // Texto branco no modo escuro
    },
    lightText: {
      color: '#000000', // Texto preto no modo claro
    },
    curtidasTexto: {
      marginLeft: 8, // Espaçamento entre o ícone e a contagem de curtidas
    },
  });

  export default PublicacoesGestao;