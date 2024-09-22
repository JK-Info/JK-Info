// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';

const Avatar = () => {
  return (
    <View>
      <Image source={{uri: 'https://i.pinimg.com/564x/e6/d0/df/e6d0dfdbf39ec45872bfd55993f6adc1.jpg'}}/>
    </View>
  );
};

const Divisao = () => {
  return (
    <View style={styles.centroLinha}>
      <View style={styles.linha}/>
    </View>
  );
};

const FotoPerfil = () => (
  <View style={styles.containerAvatar}>
    <Text>Foto</Text>
  </View>
);

const BotaoComentar = () => (
  <View style={styles.containerBotao}>
    <Button
    title='Comentar'
    style={styles.botao}
    />
  </View>
);

const Curtir = () => (
  <View style={styles.containerCurtir}>
    <Button
    title='Curtir'
    />
  </View>
);

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxPubli}>

        <View style={styles.indent}>
          <Avatar/>
          <FotoPerfil/>
          <Text>Diretor(a)</Text>
        </View>

        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>O Club de Regatas Vasco da Gama, mais conhecido como Vasco da Gama ou simplesmente Vasco, cujo acrônimo é CRVG, é uma entidade sócio-poliesportiva brasileira com sede na cidade do Rio de Janeiro, fundada em 21 de agosto de 1898 por um grupo de remadores</Text>
        </View>

        <View style={styles.bottons}>
        <Curtir/>
        <BotaoComentar/>
        </View>
      </View>
      <Divisao/>

      <View style={styles.boxPubli}>

        <View style={styles.indent}>
          <Avatar/>
          <FotoPerfil/>
          <Text>Diretor(a)</Text>
        </View>

        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>A National Basketball Association (em português: Associação Nacional de Basquetebol; abreviação oficial: NBA) é a principal liga de basquetebol profissional da América do Norte. Com 30 franquias (29 nos Estados Unidos e 1 no Canadá), a NBA também é considerada a principal liga de basquete do mundo. É um membro ativo da USA Basketball (USAB),[2] que é reconhecida pela FIBA (a Federação Internacional de Basquetebol) como a entidade máxima e organizadora do basquetebol nos Estados Unidos. A NBA é uma das 4 'major leagues' de esporte profissional na América do Norte. Os jogadores da NBA são os atletas mais bem pagos do mundo, por salário médio anual.[3]

          A liga foi fundada na cidade de Nova Iorque em 6 de Junho de 1946, como a Basketball Association of America (BAA).[4] A liga adotou o nome de National Basketball Association em 1949 quando se fundiu com a rival National Basketball League (NBL). A liga tem diversos escritórios ao redor do mundo, além de vários dos próprios clubes fora da sede principal na Olympic Tower localizada na Quinta Avenida 645. Os estúdios da NBA Entertainment e da NBA TV são localizados em Secaucus, Nova Jérsia.
          </Text>
        </View>

        <View style={styles.bottons}>
        <Curtir/>
        <BotaoComentar/>
        </View>
      </View>
      <Divisao/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxFeed: {
    backgroundColor: '#f1f1f1',
    margin: 20,
    marginLeft: '10%',
    marginRight: '10%',
    //width: '75%',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  textoPubli: {
    fontSize: 16,
    margin: 10
  },
  boxPubli: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    margin: 50,
  },
  containerAvatar: {
    //backgroundColor: 'green',
    width: 70
  },
  containerBotao: {
    width: 190,
    marginLeft: 10,
    borderRadius: 30,
    //backgroundColor: 'pink'
  },
  containerCurtir: {
    width: 100,
    borderRadius: 30,
    //backgroundColor: 'yellow'
  },
  indent: {
    marginLeft: '10%',
    flexDirection: 'row'
  },
  bottons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
    // marginLeft: '25%',
    // marginRight: '25%'
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
    backgroundColor: '#d3d3d3'
  },
  botao: {
    borderRadius: 30,
  }
});

export default HomeScreen;