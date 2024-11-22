import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../../../components/loginForm'

export default function login() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/logo.jpeg")}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.container}>
                <LoginForm/>
                <CrearCuenta/>
                <RecuperarContraseña/>
            </View>
            <Divider style={styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

function RecuperarContraseña() {
    const navigation = useNavigation()

    return (
        <Text 
            style={styles.register}
            onPress={() => navigation.navigate("recuperar-contraseña")}
        >
            ¿Olvidaste tu contraseña?{" "}
            <Text style={styles.btnRegister}>
                Recupérala
            </Text>
        </Text>
    )
} 

function CrearCuenta(props) {
    const navigation = useNavigation()

    return (
        <Text 
            style={styles.register}
            onPress={() => navigation.navigate("register")}
        >
            ¿Aún no tienes una cuenta?{" "}
            <Text style={styles.btnRegister}>
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image : {
        height: 150,
        width: "100%",
        marginBottom: 20
    },
    container: {
        marginHorizontal: 40
    },
    divider: {
        backgroundColor: "#442484",
        margin: 40
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    btnRegister: {
        color: "#442484",
        fontWeight: "bold"
    }
})