import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RecipeFormData } from '../components/recipes/RecipeNew';
import { Recipe } from '../types/types';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await fetch('/api/recipes');
    return response.json();
  }
);

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

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async ({ id, data, csrfToken }: { id: number; data: RecipeFormData; csrfToken: string }) => {
    await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(data)
    })
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
      .addCase(createRecipe.fulfilled, (state, action) => {
        if (state.status !== 'idle') {
          state.items.push(action.payload.recipe)
          state.status = 'succeeded'
        }
      })
  },
})

export default recipesSlice.reducer
