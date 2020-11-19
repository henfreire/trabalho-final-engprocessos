import AsyncStorage from '@react-native-community/async-storage'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import ducks from '../ducks'

const blacklist = []
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist,
}

const reducer = persistReducer(persistConfig, ducks)

const middleware = [...getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
    },
})]

const store = configureStore({ reducer, middleware })

export const persistor = persistStore(store)

export default store
