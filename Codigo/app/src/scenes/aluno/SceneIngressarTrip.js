import React, { useState } from 'react'

import PropTypes from 'prop-types'
import {
    Text, View, StyleSheet, TouchableOpacity,
} from 'react-native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import viagensService from '../../services/viagens'

import TextField from '../../components/TextField'
import NavBar from '../../components/navbar'
import TitlePage from '../../components/titlePage'
import AlertUtils from '../../utils/alert.util'
import Loading from '../../components/loading'
import CardViagem from '../../components/viagens/cardViagem'

const IngressarTrip = ({ navigation }) => {
    const { user } = useSelector(({ auth }) => auth)

    const [state, setState] = useState({
        showTrip: false,
        successTrip: false,
        viagem: {},
    })

    const updateState = (value) => setState((prevState) => ({ ...prevState, ...value }))
    const [loading, setLoading] = useState(false)
    const save = async (values) => {
        setLoading(true)
        console.log('values', values)
        viagensService.searchViagens({ chave: values.chave })
            .then((response) => {
                setLoading(false)
                console.log('response.data[0]', response.data)
                if (response.data && response.data.length > 0) {
                    updateState({ viagem: response.data[0], showTrip: true })
                }
            })
            .catch(
                (err) => {
                    console.log(err)
                    AlertUtils.responseError({ err })
                    setLoading(false)
                }
            )
    }

    const handleIngressar = () => {
        setLoading(true)
        const data = {
            alunos: [user.id],
            id_viagem: state.viagem.id,
        }
        console.log('data', data)
        viagensService.addAlunos(data)
            .then(() => {
                setLoading(false)
                updateState({ successTrip: true })
            })
            .catch(
                (err) => {
                    console.log(err)
                    AlertUtils.responseError({ err })
                    setLoading(false)
                }
            )
    }

    const handleEntrarOutra = () => {
        updateState({ showTrip: false, viagem: {} })
    }
    const SignupSchema = Yup.object().shape({
        chave: Yup.string()
            .min(6, 'Muito curto!')
            .required('Obrigatório'),
    })

    if (loading) {
        return (
            <View style={styles.containerLoading}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TitlePage title="Ingressar Viagem" back />
            {state.showTrip ? (
                <View style={styles.containerTrip}>
                    { state.successTrip ? (
                        <View style={styles.contentTextSuccess}>
                            <Text style={styles.textSuccess}>Você ingressou na viagem</Text>
                            <Text style={styles.textSuccessKey}>{state.viagem.chave}</Text>
                        </View>
                    )
                        : (
                            <>
                                <CardViagem trip={state.viagem} />
                                <TouchableOpacity
                                    onPress={handleIngressar}
                                    style={styles.buttonEntrar}
                                >
                                    <Text style={styles.text_button}>Ingressar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    <TouchableOpacity
                        onPress={handleEntrarOutra}
                        style={styles.buttonEntrarOutra}
                    >
                        <Text style={styles.text_button}>Entrar em outra</Text>
                    </TouchableOpacity>
                </View>
            )
                : (
                    <Formik
                        initialValues={{
                            chave: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => save(values)}
                    >
                        {({
                            handleChange, setFieldValue, handleBlur, handleSubmit, values, ...props
                        }) => (
                            <View style={styles.containerForm}>
                                <TextField
                                    iconName="key"
                                    name="chave"
                                    value={values.chave}
                                    placeholder="Chave Viagem"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    iconColor="#FFC542"
                                    {...props}
                                />
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={{
                                            ...styles.buttonSave,
                                            backgroundColor: props.dirty && props.isValid ? '#40DF9F' : 'rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <Text style={styles.text_button}>Buscar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View />
                            </View>
                        )}
                    </Formik>
                )}
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
    containerLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22343C',
        padding: 10,
    },
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22343C',
    },
    icon: {
        color: '#FFFFFF',
        margin: 10,
    },
    text_button: {
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    buttonSave: {
        borderRadius: 10,
        width: '65%',
        justifyContent: 'center',
        marginRight: 10,
        height: 60,
        backgroundColor: '#40DF9F',
    },
    containerTrip: {
        width: '100%',
        alignItems: 'center',
        height: 300,
    },
    buttonEntrar: {
        width: 200,
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#40DF9F',
        marginTop: 40,
        borderRadius: 10,
    },
    buttonEntrarOutra: {
        width: 200,
        justifyContent: 'center',
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: 40,
        borderRadius: 10,
    },
    contentTextSuccess: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textSuccess: {
        color: '#FFFFFF',
        fontSize: 25,
    },
    textSuccessKey: {
        color: '#FFC542',
        fontSize: 25,
        fontWeight: 'bold',
    },
})

IngressarTrip.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default IngressarTrip
