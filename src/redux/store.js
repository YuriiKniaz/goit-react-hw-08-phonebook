import { contactReducer } from "./contactsSlice";
import { filterReducer } from "./filterSlice";
import { configureStore  } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authorizationSlice";
import {
  persistStore,
  persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
}from 'redux-persist'



const authConfig = {
    key: 'auth',
    storage,
    whitelist: ['token']
}

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
    authorization: persistReducer(authConfig, authReducer) 
  },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

