import { configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./slices/CartSlice";
import { FilterReducer } from "./slices/FilterSlice";
import { AppReducer } from "./slices/AppSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'order_details'],
}

const persistedReducer = persistReducer(persistConfig, CartReducer)

export const store = configureStore({
    reducer:{
      App: AppReducer,
      Filter: FilterReducer,
      Cart: persistedReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);