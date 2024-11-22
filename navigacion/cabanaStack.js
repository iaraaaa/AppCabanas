import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import addCabana from '../src/screens/cabana/addCabana';
import cabana from '../src/screens/cabana/cabana';
import editCabana from '../src/screens/cabana/editCabana';
import EditCabanaForm from '../components/cabana/editCabanaForm';

const Stack = createStackNavigator();

export default function cabanaStack() {
  const [loading, setLoading] = useState(false); // Estado de carga

  // Wrapper para pasar el setLoading como props
  const EditCabanaWrapper = (props) => <EditCabanaForm {...props} setLoading={setLoading} />;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cabana"
        component={cabana}
        options={{ title: "Cabañas" }}
      />
      <Stack.Screen
        name="add-Cabana"
        component={addCabana}
        options={{ title: "Crear Cabaña" }}
      />
      <Stack.Screen
        name="edit-Cabana"
        component={EditCabanaWrapper} // Usamos el wrapper para pasar setLoading
        options={{ title: "Editar Cabaña" }}
      />
    </Stack.Navigator>
  );
}