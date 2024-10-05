import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReclamacoesSugestGestao from '../screenGestao/ReclamacoesSugestGestao';
import Notificacoes from '../screen/Notificacoes';
import HomeScreenGestao from '../screenGestao/HomeScreenGestao';

const Tab = createBottomTabNavigator();

const TabNavigatorGestor = () => (
  <Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#FFFFFF', // Cor do texto da aba ativa
    tabBarInactiveTintColor: 'gray',   // Cor do texto da aba inativa
    tabBarStyle: {
      backgroundColor: '#FFFFFF',       // Cor de fundo da tab bar
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    tabBarActiveBackgroundColor: '#00527C', // Cor de fundo da aba ativa
  }}
  >
    <Tab.Screen name="Home" component={HomeScreenGestao} />
    <Tab.Screen name="Reclamações" component={ReclamacoesSugestGestao} />
    <Tab.Screen name="Notificações" component={Notificacoes} />
  </Tab.Navigator>
);

export default TabNavigatorGestor;
