import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const userInfoLocalStorage = localStorage.getItem('userInfo');
const userInfoInit = userInfoLocalStorage ? JSON.parse(userInfoLocalStorage) : null;

const initialState = {
  token: cookies.get('token') || null,
  userInfo: userInfoInit,
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
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
});

const { reducer, actions } = userSlice;
export const { saveToken, removeToken, saveUserInfo } = actions;
export default reducer;
