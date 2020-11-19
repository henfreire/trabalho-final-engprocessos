import React, { useEffect } from 'react'

import { useNavigation, useNavigationState } from '@react-navigation/native'

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'

const NavBar = () => {
    const navigation = useNavigation()
    const state = useNavigationState((state) => state)
    const { token = null, user } = useSelector(({ auth }) => auth)

    useEffect(() => {
        console.log('token effect', token)
        if (token === null) { navigation.navigate('Home') }
    }, [token])
    console.log('state nvaa', state)

    const colorActive = '#FFC542'
    const colorDefault = '#96A7AF'

    const getRouteColor = (routeName) => {
        const isActive = state.routes[state.index] && state.routes[state.index].name === routeName
        return isActive ? colorActive : colorDefault
    }

    const renderDriverBar = () => (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate('UserPage')}
            >
                <Icon
                    style={styles.iconNavBar}
                    name="user"
                    size={30}
                    color={getRouteColor('UserPage')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Icon
                    style={styles.iconNavBar}
                    name="home"
                    size={30}
                    color={getRouteColor('Home')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('DriverTrip')}
            >
                <Icon
                    style={styles.iconNavBar}
                    name="shuttle-van"
                    size={30}
                    color={getRouteColor('DriverTrip')}
                />
            </TouchableOpacity>

        </>
    )
    const renderAlunoBar = () => (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate('UserPage')}
            >
                <Icon
                    style={styles.iconNavBar}
                    name="user"
                    size={30}
                    color={getRouteColor('UserPage')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Icon
                    style={styles.iconNavBar}
                    name="home"
                    size={30}
                    color={getRouteColor('Home')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('AlunoTrips')}
            >
                <Icon
                    style={styles.iconNavBar}
                    name="shuttle-van"
                    size={30}
                    color={getRouteColor('AlunoTrips')}
                />
            </TouchableOpacity>
        </>
    )

    return (
        <View style={styles.navBar}>
            {user.tipo === 'motorista' ? renderDriverBar() : renderAlunoBar()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#22343C',
    },
    icon: {
        color: '#FFC542',
        marginTop: 20,
        alignItems: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '80%',
        margin: 10,
        borderRadius: 10,
    },
    button: {
        flexDirection: 'column',
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

export default NavBar
