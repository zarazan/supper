import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchFoods = createAsyncThunk(
  'foods/fetchFoods',
  async () => {
    const response = await fetch('/api/foods')
    return response.json()
  }
)

interface Food {
  id: number;
  name: string;
}

interface FoodsState {
  items: Food[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: FoodsState = {
  items: [],
  status: 'idle',
  error: null
}

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export default foodsSlice.reducer
