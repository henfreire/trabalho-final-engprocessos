import React from 'react'
import {
    StyleSheet, Text, TextInput, View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const TextField = ({
    iconName, handleChange, handleBlur, value, name, errors, touched, placeholder, iconColor, ...props
}) => (
    <View style={styles.SectionStyle}>
        <Icon
            style={{ ...styles.icon, color: iconColor || '#fff' }}
            name={iconName}
            size={25}
        />
        <TextInput
            value={value}
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
            placeholder={placeholder}
            style={styles.input}
            placeholderTextColor="#ccc"
            autoCapitalize="none"
            {...props}
        />
        {errors && errors[name] && touched[name] ? <Text style={styles.error}>{errors[name]}</Text> : null}
    </View>
)

const styles = StyleSheet.create({
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
        margin: 10,
        width: '90%',
        backgroundColor: '#2E3B4A',
        borderRadius: 10,
    },
    error: {
        color: 'red',
        fontSize: 16,
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
})

export default TextField
