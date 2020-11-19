import { Alert } from 'react-native'

const responseError = ({ err }) => Alert.alert('Error!', `${err.message} \n ${err.response ? JSON.stringify(err.response.data) : ''}`)

const success = ({ message, title }) => Alert.alert(`${title || 'Sucesso!'}`, message)

export { success }

export default {
    responseError,
}
