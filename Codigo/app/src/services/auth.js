import axios from 'axios'
import settings from '../utils/settings'

const login = (data) => axios.post(`${settings.api.base}/login`, data)

const register = (data) => axios.post(`${settings.api.base}/users`, data)

export default {
    login,
    register,
}
