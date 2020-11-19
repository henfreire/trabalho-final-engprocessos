import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/auth'

import {
    setLoginData,
    setLoading,
} from './index'
import AlertUtils from '../../utils/alert.util'

export const fetchLogin = createAsyncThunk('auth/fetchLogin',
    async (data, { signal, dispatch }) => {
        try {
            dispatch(setLoading(true))
            console.log('login data data', data)
            const response = await authService.login(data)
            console.log('response', response)
            if (response.data && response.data.status === 'success') {
                dispatch(setLoginData(response.data.data))
            }
            dispatch(setLoading(false))

            return response.data
        } catch (err) {
            dispatch(setLoading(false))
            AlertUtils.responseError({ err })
            console.log('error login', err)
        }
    })

