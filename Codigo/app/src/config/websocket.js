import 'babel-polyfill'
import '../utils/window'
import Ws from '@adonisjs/websocket-client'
import settings from '../utils/settings'
import store from './configuredStore'

const ws = () => {
    const state = store.getState()
    const token = state && state.auth && state.auth.token && state.auth.token.token ? state.auth.token.token : ''

    console.log('token ws', token)
    return Ws(settings.api.ws)
        .withJwtToken(token)
        .connect()
}

export default ws
