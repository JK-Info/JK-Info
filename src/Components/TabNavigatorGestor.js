import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReclamacoesSugest from '../screen/ReclamacoesSugest';
import Notificacoes from '../screen/Notificacoes';
import HomeScreenGestao from '../screenGestao/HomeScreenGestao';

const Tab = createBottomTabNavigator();

const TabNavigatorGestor = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' },
    }}
  >
    <Tab.Screen name="Home" component={HomeScreenGestao} />
    <Tab.Screen name="Reclamações" component={ReclamacoesSugest} />
    <Tab.Screen name="Notificações" component={Notificacoes} />
  </Tab.Navigator>
);

export default TabNavigatorGestor;
