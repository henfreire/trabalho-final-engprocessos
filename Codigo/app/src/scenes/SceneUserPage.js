import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'

import { logOutUser } from '../ducks/auth'
import NavBar from '../components/navbar'

const UserPage = () => {
    const dispacth = useDispatch()
    const { user } = useSelector(({ auth }) => auth)

    const handleLogout = () => {
        console.log('logOutUser click')
        dispacth(logOutUser())
    }

    if (!user.id) { return null }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{user.nome}</Text>
            <Text style={styles.textTipo}>{user.tipo.toUpperCase()}</Text>
            <Text style={styles.textTipo}>{user.email}</Text>
            <TouchableOpacity
                onPress={handleLogout}
                style={styles.button}
            >
                <Text style={styles.text_button}>Sair</Text>
            </TouchableOpacity>
            <NavBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22343C',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#7E4C93',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        margin: 10,
        marginTop: 20,
    },
    text_button: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    textTipo: {
        color: '#FFFFFF',
        fontSize: 16,
    },
})

export default UserPage
