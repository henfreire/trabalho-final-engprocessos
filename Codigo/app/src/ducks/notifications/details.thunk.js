import { createAsyncThunk } from '@reduxjs/toolkit'
import notificationsService from '../../services/notifications'

import AlertUtils from '../../utils/alert.util'

export const storeDeviceToken = createAsyncThunk('notifications/storeDeviceToken',
    async (data) => {
        try {
            const response = await notificationsService.storeDeviceToken(data)
            return response.data
        } catch (err) {
            console.log(err)
            AlertUtils.responseError({ err })
            console.log('error saving device token', err)
        }
    })

