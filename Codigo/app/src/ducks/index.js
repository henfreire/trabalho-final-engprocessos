import { createAction, combineReducers } from '@reduxjs/toolkit'

// product information
import auth from './auth'
import notifications from './notifications'

const reducers = {
    auth,
    notifications,
}

const appReducer = combineReducers(reducers)

export const resetStore = createAction('RESET_STORE')

export default (state, action) => {
    if (action.type === 'RESET_STORE') {
        // eslint-disable-next-line no-undefined
        state = undefined
    }

    return appReducer(state, action)
}
