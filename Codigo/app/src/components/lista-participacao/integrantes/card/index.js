import React from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native'
import StatusParticipacao from '../../status'

const CardIntegrante = ({ integrante, onPress }) => {
    const handlePress = () => {
        console.log('press')
        onPress && onPress(trip)
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.CardIntegrante}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{integrante.aluno && integrante.aluno.nome[0]}</Text>
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTextItemValue}>{integrante.aluno.nome}</Text>
                    <View style={styles.contentStatus}>
                        <StatusParticipacao status={integrante.status} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    CardIntegrante: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 0,
        height: 60,
        width: '100%',
        alignItems: 'center',
    },
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    avatarText: {
        fontSize: 16,
    },
    cardTextApelido: {
        color: '#fff',
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    cardTextItem: {
        color: '#fff',
        fontWeight: 'bold',
        width: '100%',
    },
    contentStatus: {

    },
    cardTextItemValue: {
        color: '#fff',
    },
    cardTextViagem: {
        color: '#286053',
        fontSize: 13,
        fontWeight: 'bold',
    },
    cardTextHoraPartida: {
        color: '#fff',
        fontSize: 16,
        marginTop: 2,
    },
    icon: {
        color: '#FFFFFF',
        margin: 10,
    },
})

export default CardIntegrante
