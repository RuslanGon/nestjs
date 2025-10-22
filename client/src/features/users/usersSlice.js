import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Базовый URL твоего бекенда
const API_URL = "http://localhost:3000/auth";

// Регистрация пользователя
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // user объект без пароля
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
      // предположим, что сервер возвращает { access_token, user }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Получение данных текущего пользователя по токену
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().users.token;
    if (!token) return rejectWithValue("No token");

    try {
      const response = await axios.get("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // объект пользователя
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch user failed");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // регистрация
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
      })
      // логин
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.currentUser = action.payload.user; // сохраняем пользователя
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // получение текущего пользователя
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { logout, setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
