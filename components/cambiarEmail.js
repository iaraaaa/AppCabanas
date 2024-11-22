import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { isEmpty } from 'lodash';

import { reauthenticate, updateEmail } from '../src/utils/action';
import { validateEmail } from '../src/utils/helpers';

export default function CambiarEmail({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const resultReauthenticate = await reauthenticate(password);
            if (!resultReauthenticate.statusResponse) {
                setErrorPassword("Contraseña incorrecta.");
                setLoading(false);
                return;
            }

            const resultUpdateEmail = await updateEmail(newEmail);
            if (!resultUpdateEmail.statusResponse) {
                setErrorEmail("Correo ya registrado.");
                setLoading(false);
                return;
            }

            setReloadUser(true);
            toastRef.current.show("Email actualizado correctamente.", 3000);
            setShowModal(false);
        } catch (error) {
            setErrorEmail("Error al cambiar el email.");
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        setErrorEmail(null);
        setErrorPassword(null);
        let isValid = true;

        if (!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un email válido.");
            isValid = false;
        }

        if (newEmail === email) {
            setErrorEmail("Debes ingresar un email diferente al actual.");
            isValid = false;
        }

        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña.");
            isValid = false;
        }

        return isValid;
    };

    return (
        <View style={styles.view}>
            <Input
                placeholder="Nuevo correo electrónico"
                containerStyle={styles.input}
                value={newEmail}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2',
                }}
            />
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                value={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={{ color: '#c2c2c2' }}
                        onPress={() => setShowPassword(!showPassword)}
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
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        width: '95%',
    },
    btn: {
        backgroundColor: '#442484',
    },
});
