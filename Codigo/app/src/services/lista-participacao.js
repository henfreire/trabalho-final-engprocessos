import axios from 'axios'
import settings from '../utils/settings'

const getAll = (data) => axios.get(`${settings.api.base}/lista-participacao`, data)

const updateStatus = (id, data) => axios.put(`${settings.api.base}/lista-participacao/aluno/participacao/${id}`, data)

export default {
    getAll,
    updateStatus,
}
