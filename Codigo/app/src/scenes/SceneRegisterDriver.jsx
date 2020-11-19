import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    Text, Alert, View, StyleSheet, TouchableOpacity, Switch, TextInput, Image,
} from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'

export default class RegisterDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            typeDriver: false,
            name: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: '',
            model: '',
            color: '',
            board: '',
            image: null,
        }
    }

    useEffect = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!')
            }
        }
    }

    go = () => {
        const { navigate } = this.props.navigation
        if (this.state.typeDriver === true) {
            navigate('RegisterDriver')
        } else {
            navigate('Home')
        }
    }

    onLogin() {
        const { username, password } = this.state

        Alert.alert('Credentials', `${username} + ${password}`)
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>Passo 2</Text>
                <Text style={styles.h2}>Nos conte sobre seu veículo</Text>
                <View style={styles.SectionStyle}>
                    <Icon
                        style={styles.icon}
                        name="shuttle-van"
                        size={30}
                    />
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder="Modelo"
                        style={styles.input}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Icon
                        style={styles.icon}
                        name="palette"
                        size={25}
                    />
                    <TextInput
                        value={this.state.color}
                        onChange={(color) => this.setState({ color })}
                        placeholder="Cor"
                        style={styles.input}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Icon
                        style={styles.icon}
                        name="id-card"
                        size={30}
                    />
                    <TextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })}
                        placeholder="Placa"
                        style={styles.input}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigate('Register')}
                        style={{
                            backgroundColor: '#286053',
                            padding: 20,
                            borderRadius: 10,
                            width: '20%',
                            margin: 10,
                        }}
                    >
                        <Icon
                            style={styles.icon}
                            name="arrow-left"
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.go(this)}
                        style={{
                            backgroundColor: '#40DF9F',
                            padding: 15,
                            borderRadius: 10,
                            width: '60%',
                            margin: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={styles.text_button}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
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
        flex: 1,
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
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        width: 300,
        resizeMode: 'contain',
    },
    error: {
        color: 'red',
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
        marginTop: 50,
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
