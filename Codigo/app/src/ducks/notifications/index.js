import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    deviceToken: null,
}

const authSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        storeDeviceToken(state, action) {
            state.deviceToken = action.payload
        },
    },
})

export const {
    storeDeviceToken,
} = authSlice.actions

export default authSlice.reducer
