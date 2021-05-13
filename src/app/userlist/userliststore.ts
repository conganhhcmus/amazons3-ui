import { createSlice } from '@reduxjs/toolkit';
import { random, range } from 'lodash';
export interface user {
  id: number;
  userName: string;
  permisstion: number;
  accessKeyAge: string;
  passwordAge: string;
  lastActivity: string;
}
const dummyData = range(0, 15, 1).map((index: number) => ({
  id: index,
  userName: ` dummy ${random(1, 60)}`,
  permisstion: random(1, 4),
  accessKeyAge: `${random(1, 30)} day agos`,
  passwordAge: `${random(1, 30)} day agos`,
  lastActivity: `${random(1, 30)} day agos`
}))
const initialState = {
  createIamUser: {
    userName: '',
    passWord: '',
    permisstion: '',
  },
  editIamUser: {
    id: '',
    userName: '',
    permisstion: '',
    accessKeyAge: '',
    passwordAge: '',
    lastActivity: ''
  },
  listUser: dummyData,
}

const userListSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    createIamUser: (state, action) => {
      state.createIamUser = {
        ...state.createIamUser,
        ...action.payload,
      };
    },
    editIamUser: (state, action) => {
      state.editIamUser = action.payload
    },
    editIamUserFormChange: (state, action) => {
      state.editIamUser = {
        ...state.editIamUser,
        ...action.payload
      }
    },
    searchUser: (state, {payload}) => {
      if(payload.trim().length==0){
        console.log('full list');
        state.listUser= initialState.listUser
      }
      else{
        console.log('search')
        state.listUser=state.listUser.filter(data=>data.userName.includes(payload))
      }
    },
    deleteMulUser: (state, { payload }) => {
      for (let i = 0; i < payload.length; i++) {
        state.listUser = state.listUser.filter(data => data.id !== payload[i])
      }
    },
    deleteUser: (state, { payload }) => {
      state.listUser = state.listUser.filter(data => data.id !== payload)
    },
  },
});

const { reducer, actions } = userListSlice;
export const { createIamUser,
  editIamUser,
  editIamUserFormChange,
  searchUser,
  deleteMulUser, 
  deleteUser, 
} = actions
export default reducer
