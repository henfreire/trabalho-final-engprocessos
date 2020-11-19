import axios from 'axios'
import settings from '../utils/settings'

const getAll = (data) => axios.get(`${settings.api.base}/viagens`, data)

const newViagem = (data) => axios.post(`${settings.api.base}/viagens`, data)

const updateViagem = (id, data) => axios.put(`${settings.api.base}/viagens/${id}`, data)

const deleteViagem = (id) => axios.delete(`${settings.api.base}/viagens/${id}`)

const getViagem = (id) => axios.delete(`${settings.api.base}/viagens/${id}`)

const searchViagens = (search) => axios.get(`${settings.api.base}/viagens/search`, {
    params: search,
})

const addAlunos = (data) => axios.post(`${settings.api.base}/viagens/alunos`, data)

const removeAlunos = (data) => axios.post(`${settings.api.base}/viagens/alunos/remove`, data)

const getAlunoTrip = () => axios.get(`${settings.api.base}/viagens/aluno`)

export default {
    getAll,
    newViagem,
    updateViagem,
    deleteViagem,
    getViagem,
    searchViagens,
    addAlunos,
    removeAlunos,
    getAlunoTrip,
}
