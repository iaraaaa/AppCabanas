import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import inicio from '../src/screens/inicio'

const Stack = createStackNavigator()

export default function inicioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="inicio"
                component={inicio}
                options={{ title: "Inicio" }}
            />
        </Stack.Navigator>
    )
}