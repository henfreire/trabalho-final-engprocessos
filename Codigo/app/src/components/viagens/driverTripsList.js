import React, { useState, useEffect } from 'react'
import {
    StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import CardViagem from './cardViagem'
import Loading from '../loading'
import VigensService from '../../services/viagens'

import ViagensWs from '../../services/ws/viagens'

const DriverTripsList = () => {
    let viagensChanel
    const navigation = useNavigation()
    const [state, setState] = useState({
        trips: [
        ],
        loading: true,
    })

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))

    useEffect(() => {
        getTrips()
        viagensChanel = ViagensWs()
        viagensChanel.on('lista-viagens', (trips) => {
            console.log('trips', trips)
            if (trips && trips.length > 0) {
                updateState({ trips })
            }
        })
    }, [])

    useEffect(() => () => { viagensChanel && viagensChanel.close() }, [])

    const getTrips = async () => {
        VigensService.getAll()
            .then((response) => {
                if (response.data) {
                    updateState({ trips: response.data })
                }
                updateState({ loading: false })
            })
            .catch(
                (err) => {
                    updateState({ loading: false })
                    Alert.alert('Error!',
                        `${err.message} \n ${err.response ? err.response.data : ''}`)
                }
            )
    }

    const handleClickTrip = (trip) => {
        navigation.navigate('EditTrip', { trip })
    }

    if (state.loading) { return <Loading /> }

    return (
        <SafeAreaView style={styles.containerCards}>
            <ScrollView style={styles.cardsContent}>
                {state.trips.map((trip) => (
                    <CardViagem
                        key={trip.id}
                        trip={trip}
                        onPress={handleClickTrip}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#22343C',
    },
    icon: {
        color: '#FFC542',
        marginTop: 20,
        alignItems: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '80%',
        margin: 10,
        borderRadius: 10,
    },
    containerCards: {
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },
    cardsContent: {
        flexDirection: 'column',

        height: '100%',
        width: '100%',
        margin: 10,
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        resizeMode: 'contain',
    },
    navBar: {
        width: '100%',
        height: 70,
        backgroundColor: '#30444E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
    iconNavBar: {
        margin: 10,
    },
    input: {
        borderColor: '#000',
        flex: 1,
        color: '#FFFFFF',
        borderRadius: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        backgroundColor: '#2E3B4A',
        margin: 10,
    },
    h1: {
        width: '80%',
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    h2: {
        width: '80%',
        color: '#96A7AF',
        fontSize: 24,
        textAlign: 'left',
        marginBottom: 50,
    },
    h3: {
        color: '#96A7AF',
        fontSize: 16,
        textAlign: 'center',
    },
    CardViagem: {
        color: '#fff',
    },
    CardViagemText: {
        color: '#fff',
    },
})

export default DriverTripsList
