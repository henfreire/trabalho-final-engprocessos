import React, { useState, useEffect } from 'react'
import {
    StyleSheet, ScrollView, SafeAreaView, Alert, TouchableOpacity, View, Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import CardViagem from './cardViagem'
import Loading from '../loading'
import VigensService from '../../services/viagens'
import AlertUtils from '../../utils/alert.util'

const AlunoTripsList = () => {
    const { user } = useSelector(({ auth }) => auth)
    const [state, setState] = useState({
        trips: [
        ],
        loading: true,
    })

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))

    useEffect(() => {
        getTrips()
    }, [])

    const getTrips = async () => {
        updateState({ loading: true })
        VigensService.getAlunoTrip()
            .then((response) => {
                console.log('response.data', response.data)
                if (response.data) {
                    updateState({ trips: response.data })
                }
                updateState({ loading: false })
            })
            .catch(
                (err) => {
                    console.log('err', err)
                    updateState({ loading: false })
                    Alert.alert('Error!',
                        `${err.message} \n ${err.response ? err.response.data : ''}`)
                }
            )
    }

    const handleRemove = (trip) => {
        const data = {
            alunos: [user.id],
            id_viagem: trip.id,
        }
        console.log('data remove aluno', data)
        updateState({ loading: true })
        VigensService.removeAlunos(data)
            .then(() => {
                updateState({ loading: false })
                getTrips()
            })
            .catch(
                (err) => {
                    console.log(err)
                    AlertUtils.responseError({ err })
                    updateState({ loading: false })
                }
            )
    }

    if (state.loading) { return <Loading /> }

    return (
        <SafeAreaView style={styles.containerCards}>
            <ScrollView style={styles.cardsContent}>
                {state.trips.map((trip) => (
                    <View
                        key={trip.id}
                    >
                        <CardViagem
                            trip={trip}
                        />
                        <TouchableOpacity
                            onPress={() => handleRemove(trip)}
                            style={styles.buttonExitTrip}
                        >
                            <Text style={styles.buttonExitTripText}>Sair dessa viagem</Text>
                            <Icon
                                style={styles.iconNavBar}
                                name="times"
                                color="#3DD598"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
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
    buttonExitTrip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#286053',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginTop: -10,
    },
    buttonExitTripText: {
        color: '#3DD598',
        fontSize: 15,
    },
})

export default AlunoTripsList
