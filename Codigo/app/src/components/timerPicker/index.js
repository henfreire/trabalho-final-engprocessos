import React, { useState } from 'react'
import {
    View, TouchableOpacity, Text, StyleSheet,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TIME_FORMAT } from '../../utils/constants'

const TimerPicker = ({ date, onDateChange }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = (dateChanged) => {
        hideDatePicker()
        onDateChange && onDateChange(dateChanged)
    }

    console.log('date', date)

    return (
        <View>
            <TouchableOpacity
                onPress={showDatePicker}
                style={styles.buttonContainer}
            >
                <Icon
                    style={styles.icon}
                    name="clock"
                    size={25}
                />
                <Text style={styles.text}>Hora Partida</Text>
                <Text style={styles.textDate}>{format(date, TIME_FORMAT)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                date={date}
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                confirmTextIOS="Confirmar"
                cancelTextIOS="Cancelar"
                headerTextIOS="Escolher Data"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        margin: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    icon: {
        color: '#FFC542',
        marginRight: 10,
    },
    textDate: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
})

export default TimerPicker
