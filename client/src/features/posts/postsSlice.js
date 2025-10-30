import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ⚙️ Укажи базовый URL своего бекенда
const API_URL = "http://localhost:3000/posts";

// ✅ Получить все анализы крови
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

// ✅ Создать новый анализ
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

// ✅ Обновить анализ
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${API_URL}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Помилка при оновленні");
    }
  }
);

// ✅ Удалить анализ
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Помилка при видаленні");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== GET ALL =====
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

      // ===== CREATE =====
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UPDATE =====
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ===== DELETE =====
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
