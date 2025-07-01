import type { TokenI } from '@/shared/types/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const auth = localStorage.getItem('auth');

interface AuthState {
  value: TokenI;
  isAuth: boolean;
}

const initialState: AuthState = {
  value: auth ? JSON.parse(auth) : null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<TokenI>) => {
      state.value = action.payload;
      state.isAuth = true;
      localStorage.setItem('auth', JSON.stringify(state.value));
    },
  },
});

export const { authLogin } = authSlice.actions;
export default authSlice.reducer;
