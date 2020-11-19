import React, { useState } from 'react'

import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import NavBar from '../../components/navbar'
import TitlePage from '../../components/titlePage'
import AlunoListasParticipacao from '../../components/lista-participacao/aluno/listasParticipacao'

const AlunoHome = ({ navigation }) => {
    const { navigate } = navigation

    const [state, setState] = useState({
        trips: [
        ],
    })

    const updateState = (value) => setState({ ...state, ...value })

    return (
        <View style={styles.container}>
            <View style={styles.SectionStyle}>
                <View style={styles.title}><TitlePage title="Home" /></View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={() => navigate('IngressarTrip')} style={styles.button}>
                        <Icon
                            style={styles.icon}
                            name="plus-circle"
                            size={30}
                        />
                        <Text style={styles.textIcon}>Ingressar em uma Viagen</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <AlunoListasParticipacao />
            <NavBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#22343C',
        padding: 10,
    },
    icon: {
        color: '#FFC542',
        marginTop: 20,
        alignItems: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%',
        margin: 10,
    },
    title: {
        width: '70%',
    },
    actionContainer: {
        width: '20%',
    },
    containerCards: {
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 120,
    },
    textIcon: {
        color: '#96A7AF',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
    CardViagem: {
        color: '#fff',
    },
    CardViagemText: {
        color: '#fff',
    },
})

export default AlunoHome
