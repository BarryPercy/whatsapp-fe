import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = { 
    storage: storage,
    key: 'root',
  }

const combinedReducer = combineReducers({ //keeping as combineReducers so that if we scale the project they can be easily added here
    movies: whatsAppReducer,
})

const persistedReducer = persistReducer(persistConfig, combinedReducer) //so that storage persists

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
  