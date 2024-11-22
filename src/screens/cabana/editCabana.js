import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../../components/loading';

import EditCabanaForm from '../../../components/cabana/editCabanaForm';

export default function editCabana({ route, navigation }) {
    const { cabanaData } = route.params; // Datos de la cabaña seleccionada
    const toastRef = useRef();
    const [loading, setLoading] = useState(false);

    return (
        <KeyboardAwareScrollView>
            <EditCabanaForm
                cabanaData={cabanaData}
                toastRef={toastRef}
                setLoading={setLoading}
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Actualizando cabaña..." />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({});
