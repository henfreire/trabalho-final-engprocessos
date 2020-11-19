import React, { useState } from 'react'
import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const statusConstant = {
    confirmado: {
        color: '#286053',
    },
    pendente: {
        color: '#96A7AF',
    },
    rejeitado: {
        color: '#FF565E',
    },
}
const StatusParticipacao = ({ status, onChangeStatus }) => {
    const [ativo, setAtivo] = useState(false)
    const getStatusColor = () => {
        const item = status ? statusConstant[status] : statusConstant.pendente
        return item ? item.color : statusConstant.pendente.color
    }
    const showIcon = () => status === 'confirmado'

    const handlePressStatus = () => {
        onChangeStatus && setAtivo(!ativo)
    }
    const handleChangeStatus = (newStatus) => {
        if (onChangeStatus) {
            setAtivo(false)
            onChangeStatus && onChangeStatus(newStatus)
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePressStatus}>
                <View style={{
                    ...styles.content,
                    backgroundColor: getStatusColor(),
                }}
                >
                    {showIcon()
                    && (
                        <Icon
                            style={styles.icon}
                            name="check"
                            size={15}
                            color="#fff"
                        />
                    )}
                </View>
            </TouchableOpacity>
            {
                ativo && (
                    <View style={styles.semafro}>
                        <TouchableOpacity onPress={() => handleChangeStatus('confirmado')}>
                            <View style={{
                                ...styles.contentSemafro,
                                backgroundColor: statusConstant.confirmado.color,
                            }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleChangeStatus('rejeitado')}>
                            <View style={{
                                ...styles.contentSemafro,
                                backgroundColor: statusConstant.rejeitado.color,
                            }}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    content: {
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#3DD598',
        padding: 5,
        width: 30,
        height: 30,
    },
    semafro: {
        backgroundColor: '#C4C4C4',
        borderRadius: 10,
    },
    contentSemafro: {
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#3DD598',
        padding: 5,
        width: 40,
        height: 40,
        margin: 5,
    },
})

export default StatusParticipacao
