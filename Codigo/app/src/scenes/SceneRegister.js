import React from 'react'

import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    Text, View, StyleSheet, TouchableOpacity, Switch,
} from 'react-native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import authService from '../services/auth'

import TextField from '../components/TextField'
import AlertUtils from '../utils/alert.util'
import { fetchLogin } from '../ducks/auth/details.thunk'

const Register = ({ navigation }) => {
    const dispacth = useDispatch()
    const save = (values) => {
        onSingUp(values)
    }

    const onSingUp = async (values) => {
        const {
            name,
            email,
            password,
            phone,
            typeDriver,
        } = values

        const newUser = {
            nome: name,
            email,
            password,
            telefone: phone,
            tipo: typeDriver ? 'motorista' : 'aluno',
        }
        console.log('newUser', newUser)
        authService.register(newUser)
            .then(async () => {
                await dispacth(fetchLogin({ email, password }))
                navigation.navigate('Home')
            })
            .catch(
                (err) => AlertUtils.responseError({ err })
            )
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Muito curto!')
            .required('Obrigatório'),
        email: Yup.string().email('Email inválido').required('Obrigatório'),
        password: Yup.string()
            .min(3, 'Obrigatório')
            .required('Obrigatório'),
        passwordConfirm: Yup.string()
            .min(3, 'Obrigatório')
            .required('Obrigatório'),
    })

    return (
        <Formik
            initialValues={{
                typeDriver: false,
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => save(values)}
        >
            {({
                handleChange, setFieldValue, handleBlur, handleSubmit, values, ...props
            }) => (
                <View style={styles.container}>
                    <Text style={styles.h1}>Bem Vindo</Text>
                    <Text style={styles.h2}>Se apresente</Text>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.input}>Sou um motorista</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#40DF9F' }}
                            thumbColor={values.typeDriver ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setFieldValue('typeDriver', !values.typeDriver)}
                            value={values.typeDriver}
                            style={styles.icon}
                        />
                    </View>
                    <TextField
                        iconName="user"
                        name="name"
                        value={values.name}
                        placeholder="Nome"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        {...props}
                    />
                    <TextField
                        iconName="envelope"
                        name="email"
                        placeholder="E-mail"
                        value={values.email}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        {...props}
                    />
                    <TextField
                        iconName="phone"
                        name="phone"
                        placeholder="Telefone"
                        value={values.phone}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        {...props}
                    />
                    <TextField
                        iconName="lock"
                        name="password"
                        placeholder="Senha"
                        value={values.password}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        secureTextEntry
                        {...props}
                    />
                    <TextField
                        iconName="lock"
                        name="passwordConfirm"
                        placeholder="Confirmar Senha"
                        value={values.passwordConfirm}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        secureTextEntry
                        {...props}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
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
                            disabled={false}
                            onPress={handleSubmit}
                            style={{
                                backgroundColor: props.dirty && props.isValid ? '#40DF9F' : 'rgba(0,0,0,0.2)',
                                padding: 15,
                                borderRadius: 10,
                                width: '65%',
                                margin: 10,
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={styles.text_button}>Concluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
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
        width: '90%',
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
        fontSize: 16,
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

Register.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default Register
