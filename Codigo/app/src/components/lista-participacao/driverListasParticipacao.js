import React, { useState, useEffect } from 'react'
import {
    StyleSheet, ScrollView, SafeAreaView, Alert, View, Text,
} from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CardViagemSimples from '../viagens/cardViagemSimples'
import Loading from '../loading'
import ListaParticipacaoService from '../../services/lista-participacao'

import Integrantes from './integrantes'
import ListaWs from '../../services/ws/lista-participacao'

const DriverListasParticipacao = () => {
    const navigation = useNavigation()
    const initialState = {
        list: [
        ],
        loading: true,
    }
    let chanel
    const [state, setState] = useState(initialState)

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))
    function turnOnChanel() {
        chanel = ListaWs()
        chanel.on('lista', (list) => {
            console.log('list', list)
            if (list && list.length > 0) {
                updateState({ list })
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            getListas()
            turnOnChanel()
            return () => {}
        }, [])
    )

    useEffect(() => {
        getListas()
        turnOnChanel()
    }, [])

    useEffect(() => () => {
        updateState(initialState)
        chanel && chanel.close()
    }, [])

    const getListas = async () => {
        console.log('getting list participacão')
        updateState({ loading: true })
        ListaParticipacaoService.getAll()
            .then((response) => {
                if (response.data) {
                    updateState({ list: response.data })
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

    if (state.loading) {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    }

    if (state.list.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Crie uma viagem e chame alunos. Assim poderá visualizar as presenças.</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.containerCards}>
            <ScrollView style={styles.cardsContent}>
                {state.list.map((item) => (
                    <View>
                        <CardViagemSimples
                            key={item.id}
                            trip={item.viagem}
                            onPress={handleClickTrip}
                        />
                        <Integrantes data={item.integrantes} />
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
    containerCards: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 80,
    },
    cardsContent: {
        margin: 0,
        padding: 5,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    emptyText: {
        color: '#fff',
        fontSize: 20,
    },

})

export default DriverListasParticipacao
