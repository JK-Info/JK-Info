// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-web';

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boxFeed: {
    backgroundColor: '#f1f1f1',
    margin: 20,
    marginLeft: '10%',
    marginRight: '10%',
    //width: '75%',
    borderRadius: 15,
  },
  textoPubli: {
    fontSize: 16,
    margin: 10
  },
  fotoPerfil: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
  },
  boxPubli: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    margin: 50,
  },
  btnComentar: {
    height: 100,
    borderRadius: 10,
  },
  containerAvatar: {
    //backgroundColor: 'green',
    width: 70
  },
  containerBotao: {
    width: 190,
    marginLeft: 10,
    //backgroundColor: 'pink'
  },
  containerCurtir: {
    width: 100,
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
});

export default HomeScreen;