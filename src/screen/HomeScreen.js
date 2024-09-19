// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-web';

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
    <Text>Curtir</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxPubli}>
          <FotoPerfil/>
          <View style={styles.boxFeed}>
            <Text style={styles.textoPubli}>O Club de Regatas Vasco da Gama, mais conhecido como Vasco da Gama ou simplesmente Vasco, cujo acrônimo é CRVG, é uma entidade sócio-poliesportiva brasileira com sede na cidade do Rio de Janeiro, fundada em 21 de agosto de 1898 por um grupo de remadores</Text>
          </View>
        <Curtir/>
        <BotaoComentar/>
      </View>

      <View style={styles.boxPubli}>
        <FotoPerfil/>
        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>O Sport Club Corinthians Paulista, comumente referido como Corinthians, ou ainda pelo seu acrônimo SCCP, é um clube poliesportivo brasileiro da cidade de São Paulo, capital do estado de São Paulo</Text>
        </View>
        <Curtir/>
        <BotaoComentar/>
      </View>

      <View style={styles.boxPubli}>
        <FotoPerfil/>
        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>O Sport Club Corinthians Paulista, comumente referido como Corinthians, ou ainda pelo seu acrônimo SCCP, é um clube poliesportivo brasileiro da cidade de São Paulo, capital do estado de São Paulo</Text>
        </View>
        <Curtir/>
        <BotaoComentar/>
      </View>

      <View style={styles.boxPubli}>
        <FotoPerfil/>
        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>O Sport Club Corinthians Paulista, comumente referido como Corinthians, ou ainda pelo seu acrônimo SCCP, é um clube poliesportivo brasileiro da cidade de São Paulo, capital do estado de São Paulo</Text>
        </View>
        <Curtir/>
        <BotaoComentar/>
      </View>

      <View style={styles.boxPubli}>
        <FotoPerfil/>
        <View style={styles.boxFeed}>
          <Text style={styles.textoPubli}>O Sport Club Corinthians Paulista, comumente referido como Corinthians, ou ainda pelo seu acrônimo SCCP, é um clube poliesportivo brasileiro da cidade de São Paulo, capital do estado de São Paulo</Text>
        </View>
        <Curtir/>
        <BotaoComentar/>
      </View>
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
    marginLeft: 100,
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
    backgroundColor: 'red',
    margin: 50,
  },
  btnComentar: {
    height: 100,
    borderRadius: 10,
  },
  containerAvatar: {
    backgroundColor: 'green',
    width: 70
  },
  containerBotao: {
    backgroundColor: 'pink'
  },
  containerCurtir: {
    backgroundColor: 'yellow'
  }


});

export default HomeScreen;