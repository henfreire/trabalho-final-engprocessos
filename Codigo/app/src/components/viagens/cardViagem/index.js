import React from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native'

const CardDriverViagem = ({ trip, onPress }) => {
    const handlePress = () => {
        console.log('press')
        onPress && onPress(trip)
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
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
                    <Text style={styles.cardTextItem}>Origem:</Text>
                    <Text style={styles.cardTextItemValue}>{trip.origem}</Text>
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTextItem}>Destino:</Text>
                    <Text style={styles.cardTextItemValue}>{trip.destino}</Text>
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTextItem}>Hora partida:</Text>
                    <Text style={styles.cardTextItemValue}>
                        {trip.hora_partida}
                    </Text>
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTextItem}>{trip.dias_semana}</Text>
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTextItem}>Chave:</Text>
                    <Text style={styles.cardTextItemValue}>{trip.chave}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 30,
        height: 210,
        width: '100%',
        borderRadius: 10,
        borderColor: '#3ED598',
        backgroundColor: '#3ED598',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
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

export default CardDriverViagem
