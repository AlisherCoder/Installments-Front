import { configureStore } from '@reduxjs/toolkit';
import auth from '@/features/auth/store/auth.slice';

export const store = configureStore({
  reducer: {
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
