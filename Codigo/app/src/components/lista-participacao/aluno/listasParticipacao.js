import React, { useState, useEffect } from 'react'
import {
    StyleSheet, ScrollView, SafeAreaView, Alert, View,
} from 'react-native'

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import CardViagemStatus from './cardViagemStatus'
import Loading from '../../loading'
import ListaParticipacaoService from '../../../services/lista-participacao'

const AlunoListasParticipacao = () => {
    const navigation = useNavigation()
    const [state, setState] = useState({
        list: [
        ],
        loading: true,
    })

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))

    useEffect(() => {
        getListas()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getListas()

            return () => {}
        }, [])
    )

    useEffect(() => () => updateState({ list: [] }), [])

    const getListas = async () => {
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

    }

    const handleUpdate = () => {
        getListas()
    }

    if (state.loading) {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.containerCards}>
            <ScrollView style={styles.cardsContent}>
                {state.list.map((item) => (
                    <CardViagemStatus
                        key={item.id}
                        trip={item.viagem}
                        integrante={item.integrante}
                        onPress={handleClickTrip}
                        onUpdate={handleUpdate}
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
    containerCards: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingRight: 20,
        paddingLeft: 20,
        height: '100%',
        width: '100%',
    },
    cardsContent: {
        margin: 0,
        padding: 5,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },

})

export default AlunoListasParticipacao
