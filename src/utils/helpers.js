
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { size } from 'lodash'

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}




export const loadImageFromGallery = async (array) => {
  const response = { status: false, image: null };


  const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: array,
      quality: 1,
  });

  // Verificar si el usuario canceló la selección
  if (result.canceled) {
      return response;
  }

  // Actualizar el estado y la URI de la imagen
  response.status = true;
  response.image = result.assets[0].uri;
  return response;
};


export const uploadImage = async (path, name) => {
  const result = { statusResponse: false, error: null, url: null };

  // Solicitar permisos para acceder a la galería
  

  // Abrir la galería para seleccionar una imagen
  const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],  // Relación de aspecto para recortar
      quality: 1, // Calidad máxima
  });

  if (pickerResult.cancelled) {
      return result; // Si el usuario cancela, no hacemos nada
  }

  // Obtener la referencia al storage de Firebase
  const storage = getStorage();
  const storageRef = ref(storage, `${path}/${name}`);
  
  // Convertir la imagen seleccionada en un blob
  const blob = await fileToBlob(pickerResult.uri);

  try {
      // Subir el blob al storage de Firebase
      await uploadBytes(storageRef, blob);
      
      // Obtener la URL de la imagen subida
      const url = await getDownloadURL(storageRef);
      
      result.statusResponse = true; // Imagen subida correctamente
      result.url = url; // Devolver la URL de la imagen
  } catch (error) {
      console.error("Error subiendo la imagen:", error);
      result.error = error; // Devolver el error en caso de fallo
  }

  return result; // Devolver el resultado con el estado y la URL
};


export const formatPhone = (callingCode, phone) => {
    if (size(phone) < 10)
    {
        return `+(${callingCode}) ${phone}`
    }
    return `+(${callingCode}) ${phone.substr(0, 3)} ${phone.substr(3, 3)} ${phone.substr(6, 4)}`
}

const styles = StyleSheet.create({})