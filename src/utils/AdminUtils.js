// AdminUtils.js

import { query, where, getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate de que firebase.js exporte correctamente la instancia de Firestore

// Correo del usuario al que quieres asignar el rol de administrador
const ADMIN_EMAIL = "pepito1@gmail.com";

// Función para asignar el rol de administrador a un usuario por correo electrónico
export const assignAdminRole = async () => {
    const result = { statusResponse: true, error: null };

    try {
        // Crear una consulta para buscar al usuario por su correo
        const userQuery = query(collection(db, 'users'), where('email', '==', ADMIN_EMAIL));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            throw new Error("No se encontró un usuario con ese correo.");
        }

        // Supongamos que solo hay un usuario con ese correo
        const userDoc = querySnapshot.docs[0]; // Toma el primer usuario encontrado
        const userId = userDoc.id; // Obtén el ID del documento (esto sería el UID)

        // Asignar el rol 'admin' al usuario
        await setDoc(doc(db, 'users', userId), { role: 'admin' }, { merge: true });

        console.log("Rol de administrador asignado correctamente.");
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message;
        console.error("Error al asignar el rol de administrador:", error);
    }

    return result;
};