import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { ThemeContext } from '../Components/ThemeContext';
import { FontSizeContext } from '../Components/FontSizeProvider';
import { AsyncStorage } from 'react-native';
import fotoPerfilAnonima from '../../assets/FotosPerfil/Foto-perfil-Anonima.jpg';
import Icon from 'react-native-vector-icons/Ionicons';

// Componente de Avatar
const Avatar = () => <Image source={fotoPerfilAnonima} style={styles.avatarImage} />;

// Componente de Usuário
const Usuario = ({ nome, cargo, theme, fontSize }) => (
  <View style={styles.informacoesPublicacao}>
    <Text style={[theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
      {nome}
    </Text>
    <Text style={[theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
      {cargo}
    </Text>
  </View>
);

const Publicacoes = () => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comentario, setComentario] = useState('');
  const [comentariosPublicacao, setComentariosPublicacao] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { fontSize } = useContext(FontSizeContext);
  const [userId, setUserId] = useState(null);
  const [publicacaoId, setPublicacaoId] = useState(null);

  useEffect(() => {
    const fetchPublicacoes = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      const idPessoa = await AsyncStorage.getItem('user_id');
      setUserId(idPessoa);

      try {
        const response = await axios.get(`http://localhost:3000/getpublicacaousuario/${idPessoa}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPublicacoes(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
        alert('Erro ao carregar as publicações');
      }
    };

    fetchPublicacoes();
  }, []);

  const handleComentar = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    try {
      const response = await axios.post(
        `http://localhost:3000/postcomentario`,
        { Publicacao_idPublicacao: publicacaoId, text: comentario },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza os comentários
      setComentariosPublicacao([...comentariosPublicacao, response.data.comentario]);
      setComentario(''); // Limpa o campo de comentário
      setShowModal(false); // Fecha o modal
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      alert('Erro ao adicionar comentário');
    }
  };

  return (
    <ScrollView>
      {publicacoes.map((publicacao) => (
        <View key={publicacao.idPublicacao} style={styles.publicacaoContainer}>
          <Avatar />
          <Usuario nome={publicacao.nome_pessoa} cargo={publicacao.cargo} theme={theme} fontSize={fontSize} />
          <Text style={[theme === 'escuro' ? styles.darkText : styles.lightText, { fontSize }]}>
            {publicacao.publicacao_descricao}
          </Text>

          <Curtir
            count={publicacao.quantidade_likes}
            liked={false} // Lógica para verificar se o usuário já curtiu
            onPress={() => handleCurtirPublicacao(publicacao.idPublicacao, false)}
            theme={theme}
            fontSize={fontSize}
          />

          <BotaoExcluir onPress={() => handleExcluirPublicacao(publicacao.idPublicacao)} />
          <BotaoComentar
            onPress={() => {
              setPublicacaoId(publicacao.idPublicacao);
              setComentariosPublicacao(publicacao.comentarios || []); // Carrega os comentários da publicação
              setShowModal(true);
            }}
            comentarioCount={publicacao.quantidade_comentarios}
          />
        </View>
      ))}

      {/* Modal para comentar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.inputComentario}
            placeholder="Escreva seu comentário..."
            value={comentario}
            onChangeText={setComentario}
          />
          <TouchableOpacity onPress={handleComentar} style={styles.botaoEnviarComentario}>
            <Text style={styles.botaoTexto}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal(false)} style={styles.botaoFecharModal}>
            <Text style={styles.botaoTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Componente de Curtir
const Curtir = ({ count, liked, onPress, theme, fontSize }) => (
  <View style={[styles.containerCurtir, theme === 'escuro' ? styles.darkText : styles.lightText]}>
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={liked ? "heart" : "heart-outline"}
        size={24}
        color={liked ? '#FF0000' : '#FF0000'}
      />
    </TouchableOpacity>
    <Text style={[styles.curtidasTexto, theme === 'escuro' ? { color: '#FFFFFF' } : styles.lightText, { fontSize }]}>
      {count}
    </Text>
  </View>
);

// Componente de Botão de Excluir
const BotaoExcluir = ({ onPress }) => (
  <View style={styles.containerBotaoExcluir}>
    <TouchableOpacity onPress={onPress} style={styles.botaoExcluir}>
      <Text style={styles.botaoTexto}>Excluir</Text>
    </TouchableOpacity>
  </View>
);

// Componente de Botão de Comentar
const BotaoComentar = ({ onPress, comentarioCount }) => (
  <View style={styles.containerBotao}>
    <TouchableOpacity onPress={onPress} style={styles.botao}>
      <Text style={styles.botaoTexto}>
        Comentar ({comentarioCount})
      </Text>
    </TouchableOpacity>
  </View>
);

export default Publicacoes;

const styles = StyleSheet.create({
  publicacaoContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  informacoesPublicacao: {
    marginBottom: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containerCurtir: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  curtidasTexto: {
    marginLeft: 8,
  },
  containerBotaoExcluir: {
    marginTop: 10,
    alignItems: 'center',
  },
  botaoExcluir: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  containerBotao: {
    marginTop: 10,
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inputComentario: {
    height: 40,
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  botaoEnviarComentario: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botaoFecharModal: {
    marginTop: 10,
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
