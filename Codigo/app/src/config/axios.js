import axios from 'axios'

import store from './configuredStore'
import { logOutUser } from '../ducks/auth/index'

axios.interceptors.request.use((config) => {
    const state = store.getState()
    const token = state && state.auth && state.auth.token && state.auth.token.token ? state.auth.token.token : ''

    config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    return config
}, (error) => Promise.reject(error))

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('error request axios', error.response)
        if (error.response && error.response.status === 401) {
            store.dispatch(logOutUser())
        }
        return Promise.reject(error)
    }
)
