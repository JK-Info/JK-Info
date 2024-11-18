import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CardapioGestao from '../screenGestao/CardapioGestao';
import Sobrenos from '../screen/Sobrenos';
import Configuracoes from '../screen/Configuracoes';
import CustomDrawerContent from './CustomDrawerContent';
import TabNavigatorGestor from './TabNavigatorGestor';
import PerfilGestao from '../screenGestao/PerfilGestao';
import RedeGestor from '../screenGestao/RedeGestao';
import NotasGestao from '../screenGestao/NotasGestao';
import PublicacoesGestao from '../screenGestao/PublicacoesGestao';
import { LanguageContext } from '../Components/LanguageContext'; // Importa o contexto de idioma

const Drawer = createDrawerNavigator();

const DrawerNavigatorGestao = () => {
  const { language } = useContext(LanguageContext); // Acessa o idioma do contexto

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#FFFFFF',  // Cor do texto quando a aba está ativa
        drawerInactiveTintColor: '#d3d3d3',  // Cor do texto quando a aba está inativa
        drawerStyle: {
          backgroundColor: '#00527C',  // Cor de fundo do drawer
        },
        headerStyle: {
          backgroundColor: '#00527C',  // Cor do fundo do cabeçalho
        },
        headerTintColor: '#FFFFFF',  // Cor do texto do cabeçalho
      }}
    >
      <Drawer.Screen 
        name={language === 'pt' ? 'Home' : 'Home'} // Pode manter o nome fixo ou ajustar conforme o idioma
        component={TabNavigatorGestor}
      />
      <Drawer.Screen 
        name={language === 'pt' ? 'Perfil' : 'Profile'} 
        component={PerfilGestao} 
      />
      <Drawer.Screen 
        name={language === 'pt' ? 'Minhas Publicações' : 'My Posts'} 
        component={PublicacoesGestao} 
      />
      <Drawer.Screen 
        name={language === 'pt' ? 'Rede' : 'Network'} 
        component={RedeGestor} 
      />
      <Drawer.Screen 
        name={language === 'pt' ? 'Notas' : 'Grades'} 
        component={NotasGestao} 
      />
      <Drawer.Screen 
        name={language === 'pt' ? 'Cardápio' : 'Menu'} 
        component={CardapioGestao} 
      />
      <Drawer.Screen 
        name={language === 'pt' ? 'Sobre nós' : 'About Us'} 
        component={Sobrenos} 
      />
      <Drawer.Screen 
        name={language === 'pt' ? 'Configurações' : 'Settings'} 
        component={Configuracoes} 
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorGestao;
