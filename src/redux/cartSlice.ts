import {createSlice} from "@reduxjs/toolkit"
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction"
import {CartType, CategoryType} from "../types"


export type CartStateType = {
  cart: CartType | null,
  initialized: boolean
}


const initialState: CartStateType = {
  cart: null,
  initialized: false
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart: (state: CartStateType, action: PayloadAction<CartType>) => {
      console.log('>> SET CART', action)

      state.cart = action.payload
      state.initialized = true
    },

    refreshCart: (state: CartStateType) => {
      state.initialized = false
    },

    removeCart: (state: CartStateType) => {
      state.cart = null
      state.initialized = false
    }
  }
})


export const {setCart, removeCart, refreshCart} = cartSlice.actions
export default cartSlice.reducer
