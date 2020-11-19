import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import NavBar from '../components/navbar'
import DriverTripsList from '../components/viagens/driverTripsList'
import TitlePage from '../components/titlePage'

const DriverTrips = ({ navigation }) => {
    const { navigate } = navigation

    const [state, setState] = useState({
        loading: true,
    })

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))

    return (
        <View style={styles.container}>
            <View style={styles.SectionStyle}>
                <View><TitlePage title="Viagens" /></View>
                <TouchableOpacity onPress={() => navigate('CreateTrip')} style={styles.button}>
                    <Icon
                        style={styles.icon}
                        name="plus-circle"
                        size={30}
                    />
                    <Text style={styles.h3}>Nova Viagen</Text>
                </TouchableOpacity>
            </View>
            <DriverTripsList />
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '100%',
        margin: 10,
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
        width: 60,
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
    h1: {
        width: '80%',
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    h2: {
        width: '80%',
        color: '#96A7AF',
        fontSize: 24,
        textAlign: 'left',
        marginBottom: 50,
    },
    h3: {
        color: '#96A7AF',
        fontSize: 16,
        textAlign: 'center',
    },
    CardViagem: {
        color: '#fff',
    },
    CardViagemText: {
        color: '#fff',
    },
})

DriverTrips.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default DriverTrips
