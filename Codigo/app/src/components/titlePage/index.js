import React from 'react'
import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

const TitlePage = ({ back, title }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            {back && (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.buttonBack}
                >
                    <Icon
                        style={styles.iconBack}
                        name="chevron-left"
                        size={25}
                    />
                </TouchableOpacity>
            )}
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        minHeight: 60,
    },
    textTitle: {
        width: '80%',
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    buttonBack: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBackText: {
        color: '#fff',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    iconBack: {
        color: '#FFFFFF',
        marginRight: 20,
    },
})

export default TitlePage
