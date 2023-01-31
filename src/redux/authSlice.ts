import {createSlice} from "@reduxjs/toolkit"
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction"
import {CartType, CategoryType} from "../types"


export type AuthStateType = {
  token: string | null,
  email: string | null,
  initialized: boolean
}


const initialState: AuthStateType = {
  token: null,
  email: null,
  initialized: false
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthToken: (state: AuthStateType, action: PayloadAction<string>) => {
      console.log('>> SET AUTH TOKEN', action)

      localStorage.setItem('authToken', action.payload)

      const splittedJwt = action.payload.split('.')
      const userInfo: any = JSON.parse(window.atob(splittedJwt[1]))

      console.log('>> USER INFO', userInfo)

      state.token = action.payload
      state.email = userInfo.username
      state.initialized = true
    },

    logout: (state: AuthStateType) => {
      localStorage.removeItem('authToken')

      state.token = null
      state.email = null
      state.initialized = false
    }
  }
})


export const {setAuthToken, logout} = authSlice.actions
export default authSlice.reducer
