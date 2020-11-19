import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    Text, Alert, Button, View, StyleSheet, Image, TextInput, TouchableOpacity,
} from 'react-native'

export default class DriverHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }
    }

    go = () => {
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (reg.test(this.state.email) === true) {
            alert('valid')
        } else {
            alert()
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.SectionStyle}>
                    <Text style={styles.h1}>Viagens</Text>
                    <View>
                        <TouchableOpacity onPress={() => navigate('')} style={styles.button}>
                            <Icon
                                style={styles.icon}
                                name="plus-circle"
                                size={30}
                            />
                            <Text style={styles.h3}>Nova Viagen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.navBar}>
                    <TouchableOpacity
                        onPress={() => navigate('')}
                    >
                        <Icon
                            style={styles.iconNavBar}
                            name="user"
                            size={30}
                            color="#96A7AF"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('DriverTrip')}
                    >
                        <Icon
                            style={styles.iconNavBar}
                            name="shuttle-van"
                            size={30}
                            color="#FFC542"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('DriverHome')}
                    >
                        <Icon
                            style={styles.iconNavBar}
                            name="home"
                            size={30}
                            color="#96A7AF"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('')}
                    >
                        <Icon
                            style={styles.iconNavBar}
                            name="comment-dots"
                            size={30}
                            color="#96A7AF"
                        />
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
})

