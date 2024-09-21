import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigatorProfessor from './TabNavigationProfessor';
import PerfilProfessor from '../screenProfessor/PerfilProfessor';
import RedeProfessor from '../screenProfessor/RedeProfessor';
import NotasProfessor from '../screenProfessor/NotasProfessor';
import Cardapio from '../screen/Cardapio';
import Sobrenos from '../screen/Sobrenos';
import Configuracoes from '../screen/Configuracoes';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigatorProfessor = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabNavigatorProfessor} />
    <Drawer.Screen name="Perfil" component={PerfilProfessor} />
    <Drawer.Screen name="Rede" component={RedeProfessor} />
    <Drawer.Screen name="Notas" component={NotasProfessor} />
    <Drawer.Screen name="Cardápio" component={Cardapio} />
    <Drawer.Screen name="Sobre nós" component={Sobrenos} />
    <Drawer.Screen name="Configurações" component={Configuracoes} />
  </Drawer.Navigator>
);

export default DrawerNavigatorProfessor;
