import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import whatsAppReducer from '../reducers/whatsAppReducer'
import userReducer from '../reducers/userReducer'

const persistConfig = { 
    storage: storage,
    key: 'root',
  }

const combinedReducer = combineReducers({ 
    whatsApp: whatsAppReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      })
    },
  })
  const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  
export { store, persistedStore }
  