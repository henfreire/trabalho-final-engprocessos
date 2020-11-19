import React from 'react'
import {
    StyleSheet, Text, View,
} from 'react-native'

import { Checkbox } from 'react-native-paper'

const CheckBoxField = ({
    iconName, setFieldValue, value, name, errors, touched, label, iconColor, ...props
}) => (
    <View style={styles.SectionStyle}>
        <Checkbox
            status={value ? 'checked' : 'unchecked'}
            onPress={() => setFieldValue(name, !value)}
            color="#40DF9F"
            uncheckedColor="#fff"
        />
        {label && <Text style={styles.label}>{label}</Text>}
        {errors[name] && touched[name] ? <Text style={styles.error}>{errors[name]}</Text> : null}
    </View>
)

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    label: {
        marginLeft: 2,
        color: '#fff',
    },
    error: {
        color: 'red',
        fontSize: 16,
        margin: 10,
    },
})

export default CheckBoxField
