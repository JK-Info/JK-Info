import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigatorAluno from './TabNavigationAluno';
import Perfil from '../screen/Perfil';
import Turma from '../screen/Turma';
import Cardapio from '../screen/Cardapio';
import Sobrenos from '../screen/Sobrenos';
import Configuracoes from '../screen/Configuracoes';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigatorAluno = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabNavigatorAluno} />
    <Drawer.Screen name="Perfil" component={Perfil} />
    <Drawer.Screen name="Turma" component={Turma} />
    <Drawer.Screen name="Cardápio" component={Cardapio} />
    <Drawer.Screen name="Sobre nós" component={Sobrenos} />
    <Drawer.Screen name="Configurações" component={Configuracoes} />
  </Drawer.Navigator>
);

export default DrawerNavigatorAluno;
