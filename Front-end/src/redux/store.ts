import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/authSlice'
import foodReducer from '../redux/slices/foodSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        food: foodReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch
export default store
