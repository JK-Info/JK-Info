import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Cardapio from '../screen/Cardapio';
import Sobrenos from '../screen/Sobrenos';
import Configuracoes from '../screen/Configuracoes';
import CustomDrawerContent from './CustomDrawerContent';
import TabNavigatorGestor from './TabNavigatorGestor';
import PerfilGestao from '../screenGestao/PerfilGestao';
import RedeGestor from '../screenGestao/RedeGestao';
import NotasGestao from '../screenGestao/NotasGestao';

const Drawer = createDrawerNavigator();

const DrawerNavigatorGestao = ( )=> (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabNavigatorGestor} />
    <Drawer.Screen name="Perfil" component={PerfilGestao} />
    <Drawer.Screen name="Rede" component={RedeGestor} />
    <Drawer.Screen name="Notas" component={NotasGestao} />
    <Drawer.Screen name="Cardápio" component={Cardapio} />
    <Drawer.Screen name="Sobre nós" component={Sobrenos} />
    <Drawer.Screen name="Configurações" component={Configuracoes} />
  </Drawer.Navigator>
);

export default DrawerNavigatorGestao;