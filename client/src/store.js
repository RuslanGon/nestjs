import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import postsReducer from './features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

// Чтобы типизация в TypeScript работала, можно экспортировать типы
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
