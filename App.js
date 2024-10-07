import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen';
import DrawerNavigatorAluno from './src/Components/DrawerNavigation'; // Navegador de Alunos
import DrawerNavigatorProfessor from './src/Components/DrawerNavigationProfessor'; // Navegador de Professores
import TabNavigatorAluno from './src/Components/TabNavigationAluno.js'; // Navegador de Abas de Alunos
import TabNavigatorProfessor from './src/Components/TabNavigationProfessor'; // Navegador de Abas de Professores
import TabNavigatorGestao from './src/Components/TabNavigatorGestor.js';
import DrawerNavigatorGestor from './src/Components/DrawerNavigationGestao.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigatorAluno"
          component={DrawerNavigatorAluno}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigatorProfessor"
          component={DrawerNavigatorProfessor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigatorAluno"
          component={TabNavigatorAluno}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigatorProfessor"
          component={TabNavigatorProfessor}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="TabNavigatorGestao"
        component={TabNavigatorGestao}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="DrawerNavigatorGestao"
        component={DrawerNavigatorGestor}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
