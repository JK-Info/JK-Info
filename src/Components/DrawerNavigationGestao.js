import React from 'react';
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

const Drawer = createDrawerNavigator();

const DrawerNavigatorGestao = ( )=> (
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
    <Drawer.Screen name="Home" component={TabNavigatorGestor} />
    <Drawer.Screen name="Perfil" component={PerfilGestao} />
    <Drawer.Screen name="Minhas Publicações" component={PublicacoesGestao} />
    <Drawer.Screen name="Rede" component={RedeGestor} />
    <Drawer.Screen name="Notas" component={NotasGestao} />
    <Drawer.Screen name="Cardápio" component={CardapioGestao} />
    <Drawer.Screen name="Sobre nós" component={Sobrenos} />
    <Drawer.Screen name="Configurações" component={Configuracoes} />
  </Drawer.Navigator>
);

export default DrawerNavigatorGestao;
