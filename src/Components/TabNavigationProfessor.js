import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenProfessor from '../screenProfessor/HomeScreenProfessor';
import ReclamacoesSugest from '../screen/ReclamacoesSugest';
import Notificacoes from '../screen/Notificacoes';

const Tab = createBottomTabNavigator();

const TabNavigatorProfessor = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' },
    }}
  >
    <Tab.Screen name="Home" component={HomeScreenProfessor} />
    <Tab.Screen name="Reclamações" component={ReclamacoesSugest} />
    <Tab.Screen name="Notificações" component={Notificacoes} />
  </Tab.Navigator>
);

export default TabNavigatorProfessor;
