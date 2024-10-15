import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import fotoGuilherme from '../../assets/FotosSobrenos/Guilherme-gomes.jpeg';
import fotoLucas from '../../assets/FotosPerfil/Foto-perfil-Anonima.jpg';
import fotoPablo from '../../assets/FotosSobrenos/Pablo-henrique.jpeg';
import fotoCaique from '../../assets/FotosSobrenos/Caique-tavares.jpeg';


const membrosDaEquipe = [
  {
    nome: 'Guilherme Gomes da Silva',
    funcao: 'Programador Full-Stack',
    contatos: [
      { plataforma: 'Github', link: 'https://github.com/guigomes2616' },
      { plataforma: 'Linkedin', link: 'https://linkedin.com/in/guigomes2616' },
      { plataforma: 'Instagram', link: 'https://instagram.com/guigozt' }
    ],
    foto: fotoGuilherme,
  },
  {
    nome: 'Lucas Malone',
    funcao: 'Programador Back-End',
    contatos: [
      { plataforma: 'Github', link: 'https://github.com/LucasMalone' },
      { plataforma: 'Instagram', link: 'https://instagram.com/malonekastel' },
    ],
    foto: fotoLucas,
  },
  {
    nome: 'Pablo Henrique',
    funcao: 'Programador Back-End',
    contatos: [
      { plataforma: 'Github', link: 'https://github.com/PabloHenrique1533' },
      { plataforma: 'Instagram', link: 'https://instagram.com/_phenrique.03' },
    ],
    foto: fotoPablo,
  },
  {
    nome: 'Caique Rocha',
    funcao: 'Programador Full-Stack',
    contatos: [
      { plataforma: 'Github', link: 'https://github.com/c9iqueee' },
      { plataforma: 'Instagram', link: 'https://instagram.com/kkjcaique' },
    ],
    foto: fotoCaique,
  }
];

const Sobrenos = () => {
  return (
    <ScrollView style={styles.container}>
      {membrosDaEquipe.map((membro, index) => (
        <View key={index} style={styles.containerMembro}>
          <Image source={membro.foto} style={styles.foto} />
          <View style={styles.textContainer}>
            <Text style={styles.nome}>{membro.nome}</Text>
            <Text style={styles.funcao}>{membro.funcao}</Text>
            {membro.contatos.map((contato, index) => (
              <TouchableOpacity key={index} onPress={() => Linking.openURL(contato.link)}>
                <Text style={styles.contato}>
                  <Text style={styles.plataformaContato}>{contato.plataforma}: </Text>
                  <Text style={styles.linkContato}>{contato.link}</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  containerMembro: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center', // Alinha os itens ao centro
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  funcao: {
    fontSize: 16,
    marginBottom: 5,
  },
  contato: {
    fontSize: 14,
    marginVertical: 2,
  },
  plataformaContato: {
    fontWeight: 'bold',
  },
  linkContato: {
    color: 'blue',
    textDecorationLine: 'underline', // Adiciona um sublinhado aos links
  },
});

export default Sobrenos;
