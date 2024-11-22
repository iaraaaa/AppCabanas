import React, { useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { DarkModeContext } from '../../DarkModeContext'; // Asegúrate de que la ruta es correcta
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener esta librería instalada

export default function Inicio() {
  const { darkModeEnabled, toggleDarkMode } = useContext(DarkModeContext); // Accede al contexto para manejar el modo oscuro

  // Define estilos dinámicos según el modo oscuro
  const dynamicStyles = darkModeEnabled ? styles.darkMode : styles.lightMode;

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Ícono de Light-Up en la esquina superior derecha */}
      <TouchableOpacity style={styles.iconContainer} onPress={toggleDarkMode}>
        <Icon 
          name={darkModeEnabled ? "moon" : "sunny"} // El nombre del ícono cambia según el modo
          size={30} 
          color={darkModeEnabled ? "#FFF" : "#000"} 
        />
      </TouchableOpacity>

      {/* Banner con imagen de fondo */}
      <ImageBackground 
        source={require('../../assets/logo.jpeg')} 
        style={styles.banner}
      >
        <Text style={[styles.title, dynamicStyles.title]}>Welcome to Your Dream Cabin</Text>
      </ImageBackground>

      {/* Introducción */}
      <View style={styles.introContainer}>
        <Text style={[styles.introText, dynamicStyles.introText]}>
          Discover our cozy cabins and book your perfect getaway. Explore different options, manage your reservations, and enjoy a seamless experience tailored just for you!
        </Text>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  introContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  iconContainer: {
    position: 'absolute',
    top: 40, // Puedes ajustar este valor para que quede donde prefieras
    right: 20, // Alineación a la derecha
    zIndex: 1, // Asegura que el ícono quede encima de otros elementos
  },
  darkMode: {
    container: {
      backgroundColor: '#1A1A1A',
    },
    title: {
      color: '#FFF',
    },
    introText: {
      color: '#DDD',
    },
  },
  lightMode: {
    container: {
      backgroundColor: '#F5F5F5',
    },
    title: {
      color: '#000',
    },
    introText: {
      color: '#333',
    },
  },
});
