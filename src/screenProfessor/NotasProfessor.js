import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotasProfessor = () => {
  return (
    <View style={styles.container}>
      <Text>Esta é a página de NotasProfessor </Text>
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

export default NotasProfessor;

