import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createIamUser: {
    userName: '',
    passWord: '',
    permisstion: '',
  },
};

const userListSlice = createSlice({
  name: 'createIamUser',
  initialState,
  reducers: {
    createIamUser: (state, action) => {
      state.createIamUser = {
        ...state.createIamUser,
        ...action.payload,
      };
    },
  },
});

const { reducer, actions } = userListSlice;
export const { createIamUser } = actions;
export default reducer;
