import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import search from '../src/screens/search'

const Stack = createStackNavigator()

export default function searchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="search"
                component={search}
                options={{ title: "" }}
            />
        </Stack.Navigator>
    )
}