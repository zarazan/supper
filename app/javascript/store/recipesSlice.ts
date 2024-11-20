import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RecipeFormData } from '../components/recipes/New';
import { Recipe } from '../types/types';

export const createRecipe = createAsyncThunk(
  'recipes/create',
  async ({ data, csrfToken }: { data: RecipeFormData; csrfToken: string }) => {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }
    
    return response.json();
  }
);

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await fetch('/api/recipes');
    return response.json();
  }
);

interface RecipesState {
  items: Recipe[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
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
        state.items = action.payload.recipes
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  },
})

export default recipesSlice.reducer
