import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReclamacoesSugestGestao from '../screenGestao/ReclamacoesSugestGestao';
import Notificacoes from '../screen/Notificacoes';
import HomeScreenGestao from '../screenGestao/HomeScreenGestao';
import { ThemeContext } from '../Components/ThemeContext'; // Importa o ThemeContext
import { LanguageContext } from '../Components/LanguageContext'; // Importa o LanguageContext

const Tab = createBottomTabNavigator();

const TabNavigatorGestor = () => {
  const { theme } = useContext(ThemeContext); // Acessa o tema atual do contexto
  const { language } = useContext(LanguageContext); // Acessa o idioma do contexto

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme === 'escuro' ? '#FFFFFF' : '#fff', // Cor do texto da aba ativa
        tabBarInactiveTintColor: theme === 'escuro' ? '#888888' : 'gray',  // Cor do texto da aba inativa
        tabBarStyle: {
          backgroundColor: theme === 'escuro' ? '#1c1c1c' : '#FFFFFF',      // Cor de fundo da tab bar
          borderTopWidth: 1,
          borderTopColor: theme === 'escuro' ? '#333' : '#ccc',             // Cor da borda superior da tab bar
        },
        tabBarActiveBackgroundColor: theme === 'escuro' ? '#333333' : '#00527C', // Cor de fundo da aba ativa
        headerShown: false,  // Ocultar o cabeçalho em todas as telas do TabNavigator
      }}
    >
      <Tab.Screen 
        name={language === 'pt' ? 'Home' : 'Home'} 
        component={HomeScreenGestao} 
      />
      <Tab.Screen 
        name={language === 'pt' ? 'Reclamações' : 'Complaints'} 
        component={ReclamacoesSugestGestao} 
      />
      <Tab.Screen 
        name={language === 'pt' ? 'Notificações' : 'Notifications'} 
        component={Notificacoes} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorGestor;
