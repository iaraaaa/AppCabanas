import { firebaseApp } from './firebase'
//import { FireSQL } from 'firesql'
import * as firebase from './firebase'
import { db, auth } from './firebase';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, updateEmail as firebaseUpdateEmail } from "firebase/auth";

//import 'firebase/firestore'
//const db = firebase.firestore(firebaseApp)
//const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" })

export const isUserLogged = () => {
    let isLogged = false;
    auth.onAuthStateChanged((user) => {
        user !== null && (isLogged = true);
    });
    return isLogged;
};


//devuelve al usuario
export const getCurrentUser = () => {
    return auth.currentUser;
};


// Cierra la sesión del usuario actual
export const closeSession = () => {
    return signOut(auth);
};

// Registra un nuevo usuario
export const registerUser = async (email, password) => {
    const result = { statusResponse: true, error: null };
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message || "Este correo ya ha sido registrado.";
    }
    return result;
};

// Inicia sesión con correo y contraseña
export const loginWithEmailAndPassword = async (email, password) => {
    const result = { statusResponse: true, error: null };
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message || "Usuario o contraseña no válidos.";
    }
    return result;
};


export const updateProfile = async (data) => {
    const result = { statusResponse: true, error: null };
    try {
        await auth.currentUser.updateProfile(data);
    } catch (error) {
        result.statusResponse = false;
        result.error = error;
    }
    return result;
};


export const reauthenticate = async (password) => {
    const result = { statusResponse: true, error: null };
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        result.statusResponse = false;
        result.error = 'No hay usuario autenticado.';
        return result;
    }

    try {
        // Crea credenciales con el email actual del usuario
        const credentials = EmailAuthProvider.credential(user.email, password);

        // Usa el método 'reauthenticateWithCredential' de Firebase
        await reauthenticateWithCredential(user, credentials);
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message; // Captura el mensaje de error
    }

    return result;
};

export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}


export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}




export const isAdmin = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user && user.uid === "pepito1@gmail.com";
};

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getIsFavorite = async(idCabana) => {
    const result = { statusResponse: true, error: null, isFavorite: false }
    try {
        const response = await db
            .collection("favorites")
            .where("idCabana", "==", idCabana)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        result.isFavorite = response.docs.length > 0
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}



export const getCabanas = async(limitCabanas) => {
    const result = { statusResponse: true, error: null, cabanas: [], startCanabas: null }
    try {
        const response = await db
            .collection("cabanas")
            .orderBy("createAt", "desc")
            .limit(limitCabanas)
            .get()
        if (response.docs.length > 0) {
            result.startCanabas = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}