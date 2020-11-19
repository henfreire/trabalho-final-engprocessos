import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    user: {},
    token: null,
    // Thunks
    isDoingLoging: false,
    isDriver: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginData(state, action) {
            console.log('action', action)
            const { user, token } = action.payload
            state.user = user
            state.token = token
        },
        setUser(state, action) {
            state.user = action.payload.user
        },
        logOutUser(state, action) {
            console.log('logOutUser')
            state.user = {}
            state.token = null
            console.log('state next', state)
        },
        setValue(state, action) {
            state.value = action.payload.value
        },
        setLoading(state, action) {
            state.isDoingLoging = action.payload
        },
    },
    extraReducers: {

    },
})

export const {
    setUser,
    setLoginData,
    setValue,
    setLoading,
    logOutUser,
} = authSlice.actions

export default authSlice.reducer
