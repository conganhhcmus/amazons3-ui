import { createSlice } from '@reduxjs/toolkit';
import { random, range } from 'lodash';
export interface user {
  iamTokens: {
    publicToken:string,
    privateToken:string
  },
  permission: number,
  _id:string,
  username:string,
  password:string,
  owner:string
}
const initialState = {
  createIamUser: {
    userName: '',
    passWord: '',
    permisstion: '',
  },
  editIamUser: {
    id: '',
    userName: '',
    permisstion: 0,
    accessKeyAge: '',
    passwordAge: '',
    lastActivity: ''
  },
  listUser: '',
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
        state.listUser= initialState.listUser
      }
      else{
        console.log('search')
        // state.listUser=state.listUser.filter(data=>data.userName.includes(payload))
      }
    },
    deleteMulUser: (state, { payload }) => {
      // for (let i = 0; i < payload.length; i++) {
      //   state.listUser = state.listUser.filter(data => data.id !== payload[i])
      // }
    },
    deleteUser: (state, { payload }) => {
      // state.listUser = state.listUser.filter(data => data.id !== payload)
    },
    getListIamUser:(state,{payload})=>{
      state.listUser=payload
    }
  },
});

const { reducer, actions } = userListSlice;
export const { createIamUser,
  editIamUser,
  editIamUserFormChange,
  searchUser,
  deleteMulUser, 
  deleteUser, 
  getListIamUser
} = actions
export default reducer
