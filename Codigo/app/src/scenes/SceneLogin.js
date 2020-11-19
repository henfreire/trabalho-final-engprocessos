import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    Text, View, StyleSheet, Image, TextInput, TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { fetchLogin } from '../ducks/auth/details.thunk'
import { storeDeviceToken } from '../ducks/notifications/details.thunk'
import Loading from '../components/loading'

import { success } from '../utils/alert.util'

import store from '../config/configuredStore'

const Login = ({ navigation }) => {
    const { isDoingLoging } = useSelector(({ auth }) => auth)
    const dispacth = useDispatch()

    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))

    const onLogin = async () => {
        const { email, password } = state
        await dispacth(fetchLogin({ email, password }))
        onLoginSuccess()
    }

    const onLoginSuccess = async () => {
        const state = store.getState()
        const id = (state && state.auth && state.auth.user) ? state.auth.user.id : ''
        console.log(`asdasdas${id} ${deviceToken}`)
        await dispacth(storeDeviceToken({ id, deviceToken }))
    }

    const [deviceToken, setExpoPushToken] = useState('')
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log(notification)
            success(notification)
        })

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {})
        return () => {
            Notifications.removeNotificationSubscription(notificationListener)
            Notifications.removeNotificationSubscription(responseListener)
        }
    }, [])

    const registerForPushNotificationsAsync = async () => {
        let token
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
                finalStatus = status
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!')
                return
            }
            // token = (await Notifications.getDevicePushTokenAsync()).data;
            // Get the token that uniquely identifies this device
            token = (await Notifications.getExpoPushTokenAsync()).data
        } else {
            alert('Must use physical device for Push Notifications')
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            })
        }

        return token
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                resizeMethod="resize"
                source={require('../../assets/logo-branca.png')}
            />
            <Text style={styles.h1}>Bem Vindo</Text>
            <Text style={styles.h2}>Faça login para continuar</Text>
            <View style={styles.SectionStyle}>
                <Icon
                    style={styles.icon}
                    name="user"
                    size={30}
                />
                <TextInput
                    value={state.email}
                    onChangeText={(email) => updateState({ email })}
                    placeholder="Email"
                    autoCapitalize="none"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
            </View>
            <View style={styles.SectionStyle}>
                <Icon
                    style={styles.icon}
                    name="lock"
                    size={30}
                />
                <TextInput
                    value={state.password}
                    onChangeText={(password) => updateState({ password })}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
            </View>
            {isDoingLoging ? <Loading />
                : (
                    <>
                        <TouchableOpacity
                            onPress={onLogin}
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#7E4C93',
                                padding: 20,
                                borderRadius: 10,
                                width: '80%',
                                margin: 10,
                                marginTop: 20,
                            }}
                        >
                            <Text style={styles.text_button}>Entrar</Text>
                        </TouchableOpacity>
                        <Text style={styles.h3} onPress={() => this.go}>Esqueceu a senha</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#96A7AF',
                                padding: 20,
                                borderRadius: 10,
                                width: '80%',
                                margin: 10,
                            }}
                        >
                            <Text style={styles.text_button}>Cadastrar</Text>
                        </TouchableOpacity>
                    </>
                )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22343C',
    },
    icon: {
        color: '#FFFFFF',
        margin: 10,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 50,
        width: '80%',
        margin: 10,
        backgroundColor: '#2E3B4A',
        borderRadius: 10,
    },
    text_button: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logo: {
        width: 300,
        resizeMode: 'contain',
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
        margin: 20,
    },
})

export default Login
