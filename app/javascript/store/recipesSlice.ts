import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await fetch('/api/recipes')
    return response.json()
  }
)

interface Ingredient {
  id: number;
  food_name: string;
  measurement: string;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
}

interface RecipesState {
  items: Recipe[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RecipesState = {
  items: [],
  status: 'idle',
  error: null
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  },
})

export default recipesSlice.reducer
