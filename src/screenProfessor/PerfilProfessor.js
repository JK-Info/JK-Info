import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerfilProfessor = () => {
  return (
    <View style={styles.container}>
      <Text>Esta é a página de PerfilProfessor </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PerfilProfessor;

