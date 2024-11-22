import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import cabanaStack from './cabanaStack'
import inicioStack from './inicioStack'
import searchStack from './searchStack'
import cuentaStack from './cuentaStack'

import cabana from '../src/screens/cabana/cabana'

const Tab = createBottomTabNavigator()

export default function Navigacion() {
    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "inicio":
                iconName = "home-outline"
                break;
            case "cabana":
                iconName = "greenhouse"
                break;
          
            case "cuenta":
                iconName = "account"
                break;
        }

        return (
            <Icon
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="inicio"
                tabBarOptions={{
                    inactiveTintColor: "#a17dc3",
                    activeTintColor: "#442484" 
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="inicio"
                    component={inicioStack}
                    options={{ title: "Inicio" }}
                />
                <Tab.Screen
                    name="cabana"
                    component={cabanaStack}
                    options={{ title: "Cabañas" }}
                />
        
                <Tab.Screen
                    name="cuenta"
                    component={cuentaStack}
                    options={{ title: "Cuenta" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}