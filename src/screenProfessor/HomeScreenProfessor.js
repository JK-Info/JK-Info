import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreenProfessor = () => {
  return (
    <View style={styles.container}>
      <Text>Esta é a página de HomeScreenProfessor </Text>
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

export default HomeScreenProfessor;

