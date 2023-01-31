import {configureStore} from "@reduxjs/toolkit"

import categoryReducer from './categorySlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'


const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    auth: authReducer
  }
})

const state = store.getState()

export type RootStateType = typeof state

export default store
