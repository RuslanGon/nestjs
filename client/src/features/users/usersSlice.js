import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// базовый URL твоего бекенда
const API_URL = "http://localhost:3000/auth";


// Регистрация пользователя
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // обычно вернется объект user без пароля
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Логин пользователя
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data; // вернется { access_token: "..." }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
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
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
