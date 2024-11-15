import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const Cardapio = () => {
  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar o cardápio do servidor
  const fetchCardapio = async () => {
    try {
      const response = await fetch('http://localhost:3000/getCardapio'); // Coloque a URL correta aqui
      const data = await response.json();
      setCardapio(data);
    } catch (error) {
      console.error('Erro ao buscar o cardápio:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chama fetchCardapio quando o componente é montado
  useEffect(() => {
    fetchCardapio();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {cardapio.map((item, index) => (
        <View key={index} style={styles.weekDayContainer}>
          <View style={styles.fundoTitulo}>
            <Text style={styles.weekDay}>{item.diaSemana}</Text>
          </View>
          <View style={styles.menuContainer}>
            <Text>{item.prato}</Text>
            <Text style={styles.dessert}>Sobremesa: {item.sobremesa}</Text>
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
    backgroundColor: '#f0f0f0',
  },
  weekDayContainer: {
    marginBottom: 20,
  },
  fundoTitulo: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  weekDay: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  dessert: {
    fontStyle: 'italic',
  },
});

export default Cardapio;
