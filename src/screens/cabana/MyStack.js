import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cabana from './cabana';  // Asegúrate de que el nombre y la ruta sean correctos
import AddCabana from './addCabana';  // Lo mismo para AddCabana

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="cabana">
      <Stack.Screen name="cabana" component={Cabana} />
      <Stack.Screen name="addCabana" component={AddCabana} />  {/* Asegúrate de que el nombre es correcto */}
    </Stack.Navigator>
  );
}

export default MyStack;
