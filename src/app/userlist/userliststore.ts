import { createSlice } from '@reduxjs/toolkit';
export interface user {
  publicToken:string,
  privateToken:string
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
    permission: -1,
  },
  editIamUser: {
    publicToken:'',
    privateToken:'string',
    permission: -1,
    _id:'',
    username:'',
    password:'',
    owner:''
  },
  listUser: [
    {
      publicToken:'',
      privateToken:'',
      permission: null,
      _id:'',
      username:'',
      password:'',
      owner:''
    }
  ],
  temp:[
    {
      publicToken:'',
      privateToken:'',
      permission: null,
      _id:'',
      username:'',
      password:'',
      owner:''
    }
  ],
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
        state.listUser= state.temp
      }
      else{
        state.temp=state.listUser
        state.listUser=state.listUser.filter(data=>data.username.includes(payload))
      }
    },
    deleteMulUser: (state, { payload }) => {
      for (let i = 0; i < payload.length; i++) {
        state.listUser = state.listUser.filter(data => {
          if(data._id)
            data._id !== payload[i]
          return data
        })
      }
    },
    deleteUser: (state, { payload }) => {
      state.listUser = state.listUser.filter(data => data._id !== payload)
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
