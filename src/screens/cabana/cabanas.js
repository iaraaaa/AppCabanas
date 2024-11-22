import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View, Alert, Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import { ListItem, Icon, Input, Button } from 'react-native-elements'
import { isEmpty, map } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import firebase from 'firebase/app'

import CarouselImages from '../../../components/CarouselImages'
import Loading from '../../../components/loading'
import Modal from '../../../components/modal'

import { 
    addDocumentWithoutId, 
    getCurrentUser, 
    getDocumentById, 
    getIsFavorite, 
    deleteFavorite 
} from '../../utils/actions'
import { callNumber, formatPhone, sendEmail, sendWhatsApp } from '../../utils/helpers'


const widthScreen = Dimensions.get("window").width

export default function cabanas({ navigation, route }) {
    const { id, name } = route.params
    const toastRef = useRef()
    
    const [cabin, setCabin] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)

    firebase.auth().onAuthStateChanged(user => {
        setUserLogged(!!user)
        setCurrentUser(user)
    })

    navigation.setOptions({ title: name })

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getDocumentById("cabins", id) // Fetch from "cabins" collection
                if (response.statusResponse) {
                    setCabin(response.document)
                } else {
                    setCabin({})
                    Alert.alert("Error loading the cabin, please try again later.")
                }
            })()
        }, [])
    )

    useEffect(() => {
        (async() => {
            if (userLogged && cabin) {
                const response = await getIsFavorite(cabin.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, cabin])

    const addFavorite = async() => {
        if (!userLogged) {
            toastRef.current.show("You need to be logged in to add to favorites.", 3000)
            return
        }

        setLoading(true)
        const response = await addDocumentWithoutId("favorites", {
            idUser: getCurrentUser().uid,
            idCabin: cabin.id
        })
        setLoading(false)
        if (response.statusResponse) {
            setIsFavorite(true)
            toastRef.current.show("Cabin added to favorites.", 3000)
        } else {
            toastRef.current.show("Error adding to favorites. Please try later.", 3000)
        }
    }

    const removeFavorite = async() => {
        setLoading(true)
        const response = await deleteFavorite(cabin.id)
        setLoading(false)

        if (response.statusResponse) {
            setIsFavorite(false)
            toastRef.current.show("Removed from favorites.", 3000)
        } else {
            toastRef.current.show("Error removing from favorites. Please try later.", 3000)
        }
    }

    if (!cabin) {
        return <Loading isVisible={true} text="Loading..."/>
    }

    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImages
                images={cabin.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={isFavorite ? "heart" : "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite}
                    color="#442484"
                    size={35}
                />
            </View>
            <CabinInfo
                name={cabin.name}
                location={cabin.location}
                address={cabin.address}
                phone={formatPhone(cabin.callingCode, cabin.phone)}
                email={cabin.email}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Please wait..."/>
        </ScrollView>
    )
}

function CabinInfo({ name, location, address, email, phone }) {
    return (
        <View style={styles.viewCabinInfo}>
            <Text style={styles.cabinInfoTitle}>
                Information about {name}
            </Text>
            <ListItem style={styles.containerListItem}>
                <Icon type="material-community" name="map-marker" color="#442484" />
                <ListItem.Content>
                    <ListItem.Title>{address}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem style={styles.containerListItem}>
                <Icon type="material-community" name="phone" color="#442484" onPress={() => callNumber(phone)} />
                <ListItem.Content>
                    <ListItem.Title>{phone}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem style={styles.containerListItem}>
                <Icon type="material-community" name="at" color="#442484" onPress={() => sendEmail(email, "Interest", "I'm interested in your cabins.")} />
                <ListItem.Content>
                    <ListItem.Title>{email}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: { flex: 1, backgroundColor: "#fff" },
    viewFavorite: { position: "absolute", top: 0, right: 0, padding: 10 },
    viewCabinInfo: { margin: 15, marginTop: 25 },
    cabinInfoTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
    containerListItem: { borderBottomColor: "#a376c7", borderBottomWidth: 1 }
})
