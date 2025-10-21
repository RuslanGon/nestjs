import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    updatePost(state, action) {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    removePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const { setPosts, addPost, updatePost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
