import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigatorFuncionario from './TabNavigatorFuncionario';
import PerfilFuncionario from '../screenFuncionario/PerfilFuncionario';
import Sobrenos from '../screen/Sobrenos';
import Configuracoes from '../screen/Configuracoes';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigatorFuncionario = () => (
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
    <Drawer.Screen name="Home" component={TabNavigatorFuncionario} />
    <Drawer.Screen name="Perfil" component={PerfilFuncionario} />
    <Drawer.Screen name="Sobre nós" component={Sobrenos} />
    <Drawer.Screen name="Configurações" component={Configuracoes} />
  </Drawer.Navigator>
);

export default DrawerNavigatorFuncionario;
