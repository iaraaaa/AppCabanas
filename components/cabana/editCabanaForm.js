import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Switch, Text, StyleSheet } from 'react-native';
import { db } from '../../src/utils/firebase'; // Importa la configuración de Firebase
import { doc, updateDoc } from 'firebase/firestore';

export default function EditCabanaForm({ route, toastRef, setLoading, navigation }) {
  const { cabana } = route.params;
  const [name, setName] = useState(cabana.name);
  const [description, setDescription] = useState(cabana.description);
  const [phone, setPhone] = useState(cabana.phone);
  const [maxCapacity, setMaxCapacity] = useState(cabana.maxCapacity);
  const [numRooms, setNumRooms] = useState(cabana.numRooms);
  const [pricePerNight, setPricePerNight] = useState(cabana.pricePerNight);
  const [allowPets, setAllowPets] = useState(cabana.allowPets);

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (!name || !description || !phone || !maxCapacity || !numRooms || !pricePerNight) {
      toastRef.current.show('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true); // Mostrar el indicador de carga

    const updatedCabana = { name, description, phone, maxCapacity, numRooms, pricePerNight, allowPets };

    try {
      // Referencia al documento de la cabaña
      const cabanaDocRef = doc(db, "cabanas1", cabana.id);

      // Actualizar la cabaña en Firestore
      await updateDoc(cabanaDocRef, updatedCabana);
      console.log("Cabaña actualizada");

      // Redirigir a la vista de la cabaña después de la actualización
      navigation.navigate('cabana', { newCabana: { ...updatedCabana, id: cabana.id } });
    } catch (e) {
      console.error("Error al actualizar la cabaña: ", e);
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

      <Button title="Guardar Cambios" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxLabel: { marginRight: 10 },
});