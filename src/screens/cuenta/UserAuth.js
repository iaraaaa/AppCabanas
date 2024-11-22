import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/action'
import Loading from '../../../components/loading'
import InfoUser from '../../../components/infoUser'
import OpcionesUser from '../../../components/opcionesUser'

export default function UserAuth() {

    const toastRef = useRef()
    const navigation = useNavigation()
    
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [relodUser, setRelodUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setRelodUser(false)
    }, [relodUser])

    return (
        <View style={styles.container}>
             {
                user && (
                    <View>
                        <InfoUser 
                            user={user} 
                            setLoading={setLoading} 
                            setLoadingText={setLoadingText}
                        />
                        <OpcionesUser
                            user={user} 
                            toastRef={toastRef}
                            setRelodUser={setRelodUser}
                        />
                    </View>
                )
            }
            <Button
                title="Cerrar Sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={() => {
                    closeSession()
                    navigation.navigate("inicio")
                }}
            />

        <Toast ref={toastRef} position="center" opacity={0.9}/>
        <Loading isVisible={loading} text={loadingText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      minHeight: "100%",
      backgroundColor: "#f9f9f9"
  },
  btnCloseSession: {
      marginTop: 30,
      borderRadius: 5,
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "#442484",
      borderBottomWidth: 1,
      borderBottomColor: "#442484",
      paddingVertical: 10
  },
  btnCloseSessionTitle: {
      color: "#442484"
  }
})