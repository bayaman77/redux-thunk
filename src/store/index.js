import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import { basketSlice } from './basket/basket.slice'
import { mealsSlice } from './meals/meals.slice'
import { uiSlice } from './ui/ui.slice'

export const store = configureStore({
  reducer: {
    [mealsSlice.name]: mealsSlice.reducer,
    [basketSlice.name]: basketSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
})
