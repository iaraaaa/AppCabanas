import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { reauthenticate, updateEmail } from '../src/utils/action'
import { validateEmail } from '../src/utils/helpers'

export default function CambiarEmail({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState('') // Inicializa como cadena vacía
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        console.log("Iniciando proceso de cambio de email...");
        if (!validateForm()) {
            console.log("Validación del formulario falló.");
            return
        }

        setLoading(true)
        console.log("Estado de loading:", loading);
        
        const timeout = setTimeout(() => {
            console.error("El proceso de cambio de email está tardando demasiado.");
            setLoading(false);
        }, 10000); // 10 segundos

        try {
            console.log("Iniciando reautenticación...");
            const resultReauthenticate = await reauthenticate(password)
            console.log("Resultado de reautenticación:", resultReauthenticate);
            if (!resultReauthenticate.statusResponse) {
                setErrorPassword("Contraseña incorrecta.")
                console.log("Error de reautenticación: Contraseña incorrecta.");
                return
            }

            console.log("Iniciando actualización de email...");
            const resultUpdateEmail = await updateEmail(newEmail)
            console.log("Resultado de actualización de email:", resultUpdateEmail);
            if (!resultUpdateEmail.statusResponse) {
                setErrorEmail("No se puede cambiar por este correo, ya está en uso por otro usuario.")
                console.log("Error de actualización: Correo en uso por otro usuario.");
                return
            }

            console.log("Email actualizado exitosamente.");
            setReloadUser(true)
            toastRef.current.show("Se ha actualizado el email.", 3000)
            setShowModal(false)
        } catch (error) {
            console.error("Error al cambiar el email:", error)
            setErrorEmail("Ocurrió un error al intentar cambiar el email.")
        } finally {
            clearTimeout(timeout); // Limpiar el timeout
            setLoading(false)
            console.log("Estado de loading final:", loading);
        }
    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true
        console.log("Iniciando validación del formulario...");

        if (!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un email válido.")
            isValid = false
            console.log("Error: Email no válido.");
        }

        if (newEmail === email) {
            setErrorEmail("Debes ingresar un email diferente al actual.")
            isValid = false
            console.log("Error: Email igual al actual.");
        }

        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid = false
            console.log("Error: Contraseña vacía.");
        }

        console.log("Resultado de validateForm:", isValid);
        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa el nuevo correo..."
                containerStyle={styles.input}
                value={newEmail} // Cambia defaultValue por value
                keyboardType="email-address"
                onChange={(e) => {
                    console.log("Nuevo email ingresado:", e.nativeEvent.text);
                    setNewEmail(e.nativeEvent.text)
                }}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingresa tu contraseña..."
                containerStyle={styles.input}
                value={password} // Cambia defaultValue por value
                onChange={(e) => {
                    console.log("Contraseña ingresada:", e.nativeEvent.text);
                    setPassword(e.nativeEvent.text)
                }}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => {
                            setShowPassword(!showPassword)
                            console.log("Estado de mostrar contraseña:", !showPassword);
                        }}
                    />
                }
            />
            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})
