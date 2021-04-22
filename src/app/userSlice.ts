import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  token: cookies.get('token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
      cookies.set('token', action.payload, { path: '/' });
    },
    removeToken: (state) => {
      state.token = null;
      cookies.remove('token', { path: '/' });
    },
  },
});

const { reducer, actions } = userSlice;
export const { saveToken, removeToken } = actions;
export default reducer;
