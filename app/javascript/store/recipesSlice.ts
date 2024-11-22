import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RecipeFormData } from '../components/recipes/RecipeForm';
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
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
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

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async ({ id, csrfToken }: { id: number; csrfToken: string }) => {
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }
    
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
  reducers: {
    recipeUpdated: (state, action) => {
      const index = state.items.findIndex(recipe => recipe.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    }
  },
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
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.items.findIndex(recipe => recipe.id === action.payload.recipe.id)
        if (index !== -1) {
          state.items[index] = action.payload.recipe
        }
        state.status = 'succeeded'
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter(recipe => recipe.id !== action.payload.recipe.id)
        state.status = 'succeeded'
      })
  },
})

export const { recipeUpdated } = recipesSlice.actions
export default recipesSlice.reducer
