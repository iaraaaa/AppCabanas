import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Linking, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import { DarkModeContext } from '../../../DarkModeContext';

export default function Cabana({ route, navigation }) {
  const { darkModeEnabled, toggleDarkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(null);
  const { newCabana } = route.params || {};

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      setUser(!!userInfo); // Actualiza el estado según si el usuario está autenticado
    });

    return () => unsubscribe();
  }, []);

  const dynamicStyles = darkModeEnabled ? styles.darkMode : styles.lightMode;

  // Función para manejar WhatsApp
  const handleWhatsApp = () => {
    if (newCabana?.phone) {
      const phoneNumber = newCabana.phone; // Usa el número de teléfono ingresado
      const url =' https://wa.me/${phoneNumber}?text=Necesito Asesoramiento';
      Linking.openURL(url).catch((err) => console.error('Error al abrir WhatsApp', err));
    } else {
      alert('El número de teléfono no está disponible.');
    }
  };

  // Función para manejar la eliminación de la cabaña
  const handleDelete = () => {
    Alert.alert(
      "Eliminar Cabaña",
      "¿Estás seguro de que deseas eliminar esta cabaña?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            // Aquí debes implementar la lógica de eliminación (por ejemplo, eliminar de la base de datos)
            console.log("Cabaña eliminada");
            // Después de eliminar, podrías navegar de nuevo a la pantalla de listado de cabañas
            navigation.goBack();
          },
          style: "destructive"
        }
      ]
    );
  };

  // Función para manejar la edición
  const handleEdit = () => {
    if (newCabana) {
      navigation.navigate('edit-Cabana', { cabana: newCabana });
    }
  };

  return (
    <View style={[styles.viewBody, dynamicStyles.viewBody]}>
      <Icon
        type="material-community"
        name={darkModeEnabled ? 'moon' : 'sunny'}
        color={darkModeEnabled ? '#FFF' : '#000'}
        size={30}
        onPress={toggleDarkMode}
        containerStyle={styles.iconContainer}
      />

      {user && (
        <View style={styles.floatingButtonContainer}>
          <Icon
            type="material-community"
            name="plus"
            color="#442484"
            reverse
            containerStyle={styles.btnContainer}
            onPress={() => navigation.navigate('add-Cabana')}
          />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {newCabana ? (
          <View style={[styles.cabanaContainer, dynamicStyles.cabanaContainer]}>
            <Text style={[styles.title, dynamicStyles.title]}>{newCabana.name}</Text>
            <Text style={[styles.description, dynamicStyles.description]}>{newCabana.description}</Text>
            <Text style={[styles.info, dynamicStyles.info]}>Teléfono: {newCabana.phone}</Text>
            <Text style={[styles.info, dynamicStyles.info]}>Capacidad máxima: {newCabana.maxCapacity} personas</Text>
            <Text style={[styles.info, dynamicStyles.info]}>Número de habitaciones: {newCabana.numRooms}</Text>
            <Text style={[styles.info, dynamicStyles.info]}>Precio por noche: ${newCabana.pricePerNight}</Text>
            <Text style={[styles.info, dynamicStyles.info]}>Permite mascotas: {newCabana.allowPets ? 'Sí' : 'No'}</Text>

            {/* Botón de Editar */}
            <Button
              title="Editar"
              onPress={handleEdit}
            />

            {/* Botón de Eliminar */}
            <Button
              title="Eliminar"
              color="red"
              onPress={handleDelete}
            />

            {/* Botón de WhatsApp */}
            <Button
              title="Enviar por WhatsApp"
              color="green"
              onPress={handleWhatsApp}
            />
          </View>
        ) : (
          <View style={styles.noCabanaContainer}>
            <Text style={styles.noCabanaText}>No se ha encontrado la cabaña.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: { flex: 1 },
  scrollContainer: {
    paddingBottom: 60, // Espacio para el botón flotante
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1, // Asegura que el botón quede encima del contenido
  },
  btnContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  cabanaContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: '#FFF', // Fondo blanco para los detalles
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Sombra de color negro
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Sombra para Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  darkMode: {
    viewBody: { backgroundColor: '#1A1A1A' },
    cabanaContainer: {
      backgroundColor: '#333', // Fondo oscuro para el contenedor de la cabaña
      color: '#FFF', // Texto blanco en modo oscuro
    },
    title: { color: '#FFF' },
    description: { color: '#FFF' },
    info: { color: '#FFF' },
  },
  lightMode: {
    viewBody: { backgroundColor: '#F5F5F5' },
    cabanaContainer: {
      backgroundColor: '#FFF', // Fondo claro para el contenedor de la cabaña
    },
    title: { color: '#000' },
    description: { color: '#000' },
    info: { color: '#000' },
  },
  noCabanaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noCabanaText: {
    fontSize: 18,
    color: '#888',
  },
});