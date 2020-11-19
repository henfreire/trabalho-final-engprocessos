import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native'

import NavBar from '../components/navbar'
import DriverListasParticipacao from '../components/lista-participacao/driverListasParticipacao'
import TitlePage from '../components/titlePage'

const DriverHome = ({ navigation }) => {
    const { navigate } = navigation

    const [state, setState] = useState({
        loading: true,
    })

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))

    return (
        <View style={styles.container}>
            <TitlePage title="Presença" />
            <DriverListasParticipacao />
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
        width: '100%',
    },
})

DriverHome.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default DriverHome
