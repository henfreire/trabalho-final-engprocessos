import axios from 'axios'
import settings from '../utils/settings'

const storeDeviceToken = (data) => axios.post(`${settings.api.base}/storeDeviceToken`, data)

export default {
    storeDeviceToken,
}
