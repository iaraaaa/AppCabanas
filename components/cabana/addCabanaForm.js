import React, { useState } from 'react';
import { View, TextInput, Button, Switch, Text, StyleSheet } from 'react-native';
import { db } from '../../src/utils/firebase'; // Importa la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

export default function AddCabanaForm({ toastRef, setLoading, navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [allowPets, setAllowPets] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (!name || !description || !phone || !maxCapacity || !numRooms || !pricePerNight) {
      toastRef.current.show('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true); // Mostrar el indicador de carga

    // Crear el objeto de la cabaña
    const newCabana = {
      name,
      description,
      phone,
      maxCapacity,
      numRooms,
      pricePerNight,
      allowPets
    };

    try {
      // Agregar la cabaña a Firestore
      const docRef = await addDoc(collection(db, "cabanas1"), newCabana);
      console.log("Cabaña añadida con ID:", docRef.id);

      // Pasar los datos a la pantalla principal
      navigation.navigate('cabana', { newCabana: { ...newCabana, id: docRef.id } });

    } catch (e) {
      console.error("Error al agregar la cabaña: ", e);
    } finally {
      setLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre de la Cabaña" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Capacidad Máxima" value={maxCapacity} onChangeText={setMaxCapacity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Número de Habitaciones" value={numRooms} onChangeText={setNumRooms} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Precio por Noche" value={pricePerNight} onChangeText={setPricePerNight} keyboardType="numeric" />

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Permite Mascotas</Text>
        <Switch value={allowPets} onValueChange={setAllowPets} />
      </View>

      <Button title="Crear Cabaña" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxLabel: { marginRight: 10 },
});