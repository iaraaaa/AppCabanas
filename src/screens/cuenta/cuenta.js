import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect ,useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { getCurrentUser, isUserLogged } from '../../utils/action'
import Loading from '../../../components/loading'
import UserGuest from './UserGuest'
import UserAuth from './UserAuth'

export default function cuenta() {
    const [login, setLogin] = useState(null)

    useFocusEffect (
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return login ? <UserAuth/> : <UserGuest/>
}

const styles = StyleSheet.create({})