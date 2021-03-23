/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getAllCategories from '../services/categoryService'

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await getAllCategories()
      return response.data.categories
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: 'idle',
    error: '',
  },
  extraReducers: {
    // eslint-disable-next-line no-return-assign
    [getCategories.pending]: (state) => {
      state.items = []
      state.loading = 'loading'
    },
    [getCategories.fulfilled]: (state, action) => {
      state.items = action.payload
      state.loading = 'loaded'
    },
    [getCategories.rejected]: (state, action) => {
      state.error = action.error.message
      state.loading = 'error'
    },
  },
})

export default categoriesSlice.reducer

export const selectAllCategories = (state) => state.categories.items
