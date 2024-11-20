import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from './recipesSlice'
import foodsReducer from './foodsSlice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    foods: foodsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
