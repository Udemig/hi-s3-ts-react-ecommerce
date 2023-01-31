import {createSlice} from "@reduxjs/toolkit"
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction"
import {CategoryType} from "../types"


export type CategoryStateType = {
  categories: CategoryType[],
  initialized: boolean
}


const initialState: CategoryStateType = {
  categories: [],
  initialized: false
}

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    setCategories: (state: CategoryStateType, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload
      state.initialized = true
    }
  }
})


export const {setCategories} = categorySlice.actions
export default categorySlice.reducer
