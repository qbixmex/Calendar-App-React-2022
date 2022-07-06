import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking', // authenticated, not-authenticated, checking
  user: {},
  errorMessage: undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: ( state ) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage  = undefined;
    },
    onLogin: ( state, action ) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: ( state, action ) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = action.payload;
    },
    onClearMessage: ( state ) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, onClearMessage } = authSlice.actions;
