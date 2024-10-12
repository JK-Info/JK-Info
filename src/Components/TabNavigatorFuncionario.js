import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenFuncionario from '../screenFuncionario/HomeScreenFuncionario';
import ReclamacoesSugest from '../screen/ReclamacoesSugest';
import Notificacoes from '../screen/Notificacoes';

const Tab = createBottomTabNavigator();

const TabNavigatorFuncionario = () => (
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
    <Tab.Screen name="Home" component={HomeScreenFuncionario} />
    <Tab.Screen name="Reclamações" component={ReclamacoesSugest} />
    <Tab.Screen name="Notificações" component={Notificacoes} />
  </Tab.Navigator>
);

export default TabNavigatorFuncionario;
