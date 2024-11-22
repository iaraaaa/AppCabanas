import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import RegisterForm from '../../../components/registerForm'

export default function register() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/logo.jpeg")}
                resizeMode="contain"
                style={styles.image}
            />
            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image : {
        height: 150,
        width: "100%",
        marginBottom: 20
    },
})