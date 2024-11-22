import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import cuenta from '../src/screens/cuenta/cuenta'
import login from '../src/screens/cuenta/login'
import register from '../src/screens/cuenta/register'

const Stack = createStackNavigator()

export default function cuentaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="cuenta"
                component={cuenta}
                options={{ title: "" }}
            />
             <Stack.Screen
                name="login"
                component={login}
                options={{ title: "Iniciar sesion" }}
            />
            <Stack.Screen
                name="register"
                component={register}
                options={{ title: "Registrarse" }}
            />
        </Stack.Navigator>
    )
}