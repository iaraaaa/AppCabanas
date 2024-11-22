import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { size } from 'lodash';
import { formatPhone } from '../../src/utils/helpers';

export default function ListCabanas({ cabanas, navigation, handleLoadMore }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={cabanas}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem={(cabana) => (
                    <CabanaItem cabana={cabana} navigation={navigation}/>
                )}
            />
        </View>
    );
}

function CabanaItem({ cabana, navigation }) {
    const {
        id, images, name, description, phone, maxCapacity, pricePerNight, allowPets
    } = cabana.item;
    const imageCabana = images && images.length > 0 ? images[0] : require('../../assets/no-image.png');

    const goCabanaDetail = () => {
        navigation.navigate("cabanaDetail", { id, name });
    };

    return (
        <TouchableOpacity onPress={goCabanaDetail}>
            <View style={styles.viewCabana}>
                <View style={styles.viewCabanaImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={{ uri: imageCabana }}
                        style={styles.imageCabana}
                    />
                </View>
                <View style={styles.cabanaInfo}>
                    <Text style={styles.cabanaTitle}>{name}</Text>
                    <Text style={styles.cabanaDescription}>
                        {size(description) > 0 ? `${description.substr(0, 60)}...` : "Sin descripción"}
                    </Text>
                    <Text style={styles.cabanaInformation}>Tel: {formatPhone(phone)}</Text>
                    <Text style={styles.cabanaInformation}>Capacidad: {maxCapacity} personas</Text>
                    <Text style={styles.cabanaInformation}>Precio: ${pricePerNight} por noche</Text>
                    <Text style={styles.cabanaInformation}>
                        {allowPets ? "Permite mascotas" : "No permite mascotas"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewCabana: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    viewCabanaImage: {
        marginRight: 15,
    },
    imageCabana: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    cabanaInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    cabanaTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    cabanaDescription: {
        color: 'grey',
        marginBottom: 5,
    },
    cabanaInformation: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 3,
    },
});
