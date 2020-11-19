import React, { useState } from 'react'

import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    Text, View, StyleSheet, TouchableOpacity,
} from 'react-native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { parse, isValid, format } from 'date-fns'
import DatePicker from 'react-native-datepicker'
import viagensService from '../../services/viagens'

import TextField from '../../components/TextField'
import CheckBoxField from '../../components/CheckBoxField'
import NavBar from '../../components/navbar'
import { TIME_FORMAT } from '../../utils/constants'
import TitlePage from '../../components/titlePage'
import AlertUtils from '../../utils/alert.util'
import Loading from '../../components/loading'
import TimerPicker from '../../components/timerPicker'

const diasSemanaOptions = 'seg,ter,qua,qui,sex,sab,dom'
const EditTrip = ({ navigation, route }) => {
    console.log('route', route)

    const { trip } = route.params

    if (!trip) { navigation.goBack() }

    const diasSemana = {}
    diasSemanaOptions.split(',').forEach((dia) => (diasSemana[dia] = trip.dias_semana.indexOf(dia) !== -1))
    console.log('diasSemana', diasSemana)
    const [loading, setLoading] = useState(false)
    const save = async (values) => {
        setLoading({ loading: true })
        const diasSemanaEdit = Object.entries(values.dias_semana)
            .filter((item) => item[1])
            .map((item) => item[0])
            .toString()
        console.log('dias_semana', diasSemana)

        const horaPartida = isValid(new Date(values.hora_partida)) ? format(values.hora_partida, TIME_FORMAT) : values.hora_partida
        const newViagem = {
            ...values,
            hora_partida: horaPartida,
            dias_semana: diasSemanaEdit,
        }
        viagensService.updateViagem(trip.id, newViagem)
            .then(() => {
                setLoading(false)
                navigation.goBack()
                AlertUtils.success({ message: 'Viagem alterada com sucesso' })
            })
            .catch(
                (err) => {
                    console.log(err)
                    AlertUtils.responseError({ err })
                    setLoading(false)
                }
            )
    }

    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await viagensService.deleteViagem(trip.id)
            if (response) {
                AlertUtils.success({ message: 'Viagem excluída com sucesso' })
            }
            setLoading(false)
            navigation.goBack()
        } catch (err) {
            setLoading(false)
            AlertUtils.responseError({ err })
        }
    }

    const SignupSchema = Yup.object().shape({
        apelido: Yup.string()
            .min(2, 'Muito curto!')
            .required('Obrigatório'),
        origem: Yup.string()
            .min(2, 'Muito curto!')
            .required('Obrigatório'),
        destino: Yup.string()
            .min(2, 'Muito curto!')
            .required('Obrigatório'),
        hora_partida: Yup.string()
            .required('Obrigatório'),
    })

    return (
        <View style={styles.container}>
            <TitlePage title="Editar Viagem" back />
            <Formik
                initialValues={{
                    apelido: trip.apelido,
                    origem: trip.origem,
                    destino: trip.destino,
                    // eslint-disable-next-line max-len
                    hora_partida: isValid(new Date(trip.hora_partida)) ? new Date(trip.hora_partida) : parse(trip.hora_partida, TIME_FORMAT, new Date()),
                    dias_semana: diasSemana,
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => save(values)}
            >
                {({
                    handleChange, setFieldValue, handleBlur, handleSubmit, values, ...props
                }) => (
                    <View style={styles.containerForm}>
                        <TextField
                            iconName="font"
                            name="apelido"
                            value={values.apelido}
                            placeholder="Apelido da Viagem"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            iconColor="#FFC542"
                            {...props}
                        />
                        <TextField
                            iconName="map-marker-alt"
                            name="origem"
                            placeholder="Endereço de Origem"
                            value={values.origem}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            iconColor="#FFC542"
                            {...props}
                        />
                        <TextField
                            iconName="map-marker-alt"
                            name="destino"
                            placeholder="Endereço de Destino"
                            value={values.destino}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            iconColor="#FFC542"
                            {...props}
                        />
                        <TimerPicker
                            date={values.hora_partida}
                            onDateChange={(date) => {
                                setFieldValue('hora_partida', date)
                            }}
                        />

                        <View style={styles.containerDiasAtendidos}>
                            <Icon
                                style={styles.iconDiasAtendidos}
                                name="calendar-alt"
                                size={25}
                            />
                            <Text style={styles.textDiasAtendidos}>Dias atendidos</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <View style={styles.checkboxColumn}>
                                <CheckBoxField
                                    name="dias_semana.seg"
                                    label="Seg"
                                    value={values.dias_semana.seg}
                                    setFieldValue={setFieldValue}
                                    {...props}
                                />
                                <CheckBoxField
                                    name="dias_semana.ter"
                                    label="Ter"
                                    value={values.dias_semana.ter}
                                    setFieldValue={setFieldValue}
                                    {...props}
                                />
                                <CheckBoxField
                                    name="dias_semana.qua"
                                    label="Qua"
                                    value={values.dias_semana.qua}
                                    setFieldValue={setFieldValue}
                                    {...props}
                                />
                                <CheckBoxField
                                    name="dias_semana.qui"
                                    label="Qui"
                                    value={values.dias_semana.qui}
                                    setFieldValue={setFieldValue}
                                    {...props}
                                />
                                <CheckBoxField
                                    name="dias_semana.sex"
                                    label="Sex"
                                    value={values.dias_semana.sex}
                                    setFieldValue={setFieldValue}
                                    {...props}
                                />
                            </View>

                            <View style={styles.checkboxColumnBottom}>
                                <CheckBoxField
                                    name="dias_semana.sab"
                                    label="Sab"
                                    value={values.dias_semana.sab}
                                    setFieldValue={setFieldValue}
                                    {...props}
                                />
                                <CheckBoxField
                                    name="dias_semana.dom"
                                    label="Dom"
                                    value={values.dias_semana.dom}
                                    setFieldValue={setFieldValue}
                                    {...props}
                                />
                            </View>
                        </View>
                        {loading ? <Loading />
                            : (
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={{
                                            ...styles.buttonSave,
                                            backgroundColor: props.isValid ? '#40DF9F' : 'rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <Text style={styles.text_button}>Salvar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleDelete}
                                        style={styles.buttonDelete}
                                    >
                                        <Icon
                                            style={styles.icon}
                                            name="trash"
                                            size={30}
                                        />
                                        <Text style={styles.buttonDeleteText}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        <View />
                    </View>
                )}
            </Formik>
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
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22343C',
    },
    icon: {
        color: '#FFFFFF',
        margin: 10,
    },
    checkboxContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        width: '100%',
        margin: 10,
        padding: 10,
        backgroundColor: '#2E3B4A',
        borderRadius: 10,
    },
    checkboxColumn: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    checkboxColumnBottom: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    containerDiasAtendidos: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 10,
        width: '100%',
    },
    iconDiasAtendidos: {
        color: '#FFC542',
        marginRight: 10,
    },
    textDiasAtendidos: {
        color: '#fff',
        fontSize: 20,
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
    },
    buttonDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF565E',
        borderRadius: 10,
        width: '30%',
        padding: 0,
        height: 60,
    },
    buttonDeleteText: {
        color: '#fff',
    },
})

EditTrip.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default EditTrip
