import 'babel-polyfill'
import WsConfig from '../../config/websocket'
import store from '../../config/configuredStore'

const connect = () => {
    const state = store.getState()
    const idUser = state && state.auth && state.auth.user && state.auth.user.id ? state.auth.user.id : ''

    const topic = `lista-participacao:${idUser}`
    const ws = WsConfig()
    return ws.getSubscription(topic) || ws.subscribe(topic)
}

export default connect
