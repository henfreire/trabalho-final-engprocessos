import React, { useState, useEffect } from 'react'
import {
    StyleSheet, ScrollView, SafeAreaView, Alert, Text,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import CardIntegrante from './card'

const Integrantes = ({ data }) => {
    const navigation = useNavigation()
    const [state, setState] = useState({
        loading: true,
    })

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))

    const handleClickTrip = () => {

    }

    return (
        <SafeAreaView style={styles.containerCards}>
            <ScrollView style={styles.cardsContent}>
                <Text style={styles.textParticipantes}>Participantes</Text>
                {data.map((integrante) => (
                    <CardIntegrante
                        key={integrante.id}
                        integrante={integrante}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerCards: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardsContent: {
        flexDirection: 'column',
        width: '100%',
    },
    textParticipantes: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
    },
})

export default Integrantes
