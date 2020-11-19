import React from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native'
import { format } from 'date-fns'
import StatusParticipacao from '../../status'
import ListaParticipacaoService from '../../../../services/lista-participacao'
import { DATETIME_FORMAT } from '../../../../utils/constants'

const CardDriverViagem = ({
    trip, integrante, onPress, onUpdate,
}) => {
    const handlePress = () => {
        console.log('press')
        onPress && onPress(trip)
    }

    const handleChangeStatus = (status) => {
        console.log('status', status)
        ListaParticipacaoService.updateStatus(integrante.id, {
            status,
        })
            .then((response) => {
                console.log('response', response)
                onUpdate && onUpdate(response.data)
            })
            .catch(
                (err) => {
                    Alert.alert('Error!',
                        `${err.message} \n ${err.response ? err.response.data : ''}`)
                }
            )
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTextViagem}>Viagem</Text>
                    <Text style={styles.cardTextApelido}>{trip.apelido}</Text>
                    {
                        trip.motorista && (
                            <View style={styles.cardText}>
                                <Text style={styles.cardTextItem}>Motorista:</Text>
                                <Text style={styles.cardTextItemValue}>{trip.motorista.nome}</Text>
                            </View>
                        )
                    }
                    <View style={styles.cardText}>
                        <Text style={styles.cardTextItem}>Hora partida:</Text>
                        <Text style={styles.cardTextItemValue}>
                            {trip.hora_partida}
                        </Text>
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTextItem}>Data:</Text>
                        {integrante && integrante.data && (
                            <Text style={styles.cardTextItemValue}>
                                {format(new Date(integrante.data), DATETIME_FORMAT)}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.contentStatus}>
                    {integrante
                    && (
                        <StatusParticipacao
                            status={integrante.status}
                            onChangeStatus={handleChangeStatus}
                        />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
        height: 120,
        width: '100%',
        borderRadius: 10,
        borderColor: '#3ED598',
        backgroundColor: '#3ED598',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    cardContent: {
        width: '90%',
    },
    contentStatus: {
        justifyContent: 'flex-end',

    },
    cardTextApelido: {
        color: '#fff',
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 2,
    },
    cardTextItem: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 3,
        fontSize: 16,
    },
    cardTextItemValue: {
        color: '#fff',
        fontSize: 16,
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

export default CardDriverViagem
