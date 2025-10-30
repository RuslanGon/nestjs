import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/posts";

// Получение всех постов
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Не вдалося отримати дані");
    }
  }
);

// Создание нового поста
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Не вдалося створити запис");
    }
  }
);

// Восстановление последнего поста из localStorage
const savedLastPost = JSON.parse(localStorage.getItem("lastPost"));

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    lastPost: savedLastPost || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createPost
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;

        // Добавляем дату в ISO формате, если сервер её не вернул
        const postWithDate = {
          ...action.payload,
          date:
            action.payload.date ||
            new Date().toISOString(), // ISO формат для корректного парсинга
        };

        state.posts.push(postWithDate);
        state.lastPost = postWithDate;

        // Сохраняем в localStorage
        localStorage.setItem("lastPost", JSON.stringify(postWithDate));
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
