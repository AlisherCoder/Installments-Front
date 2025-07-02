import type { TokenI } from '@/shared/types/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const auth = localStorage.getItem('auth');

interface AuthState {
  value: TokenI | null;
}

const initialState: AuthState = {
  value: auth ? JSON.parse(auth) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenI>) => {
      state.value = action.payload;
      localStorage.setItem('auth', JSON.stringify(state.value));
    },

    logout: (state) => {
      state.value = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
