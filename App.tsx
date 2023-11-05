import React from 'react';
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Cadastro from './src/screens/Cadastro';
import CadPets from './src/screens/CadPets';
import ListPet from './src/screens/ListPet';
import DetalhesPet from './src/screens/DetalhesPet';

const Stack = createNativeStackNavigator();



function App(): JSX.Element {

  return (

    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Cadastro' component={Cadastro} />
        <Stack.Screen name='CadPets' component={CadPets} />
        <Stack.Screen name='ListPet' component={ListPet} />
        <Stack.Screen name='DetalhesPet' component={DetalhesPet} />

      </Stack.Navigator>
    </NavigationContainer>


  )

}

export default App;