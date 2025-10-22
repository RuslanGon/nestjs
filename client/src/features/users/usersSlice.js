import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ базовый URL твоего NestJS-бэкенда
const API_URL = 'http://localhost:3000/auth';

// thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// слайс
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
