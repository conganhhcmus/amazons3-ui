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
const dummyData= range(0,15,1).map((index: number)=>({
  id: index,
  userName: ` dummy ${random(1,60)}`,
  permisstion: random(1,4),
  accessKeyAge: `${random(1,30)} day agos`,
  passwordAge: `${random(1,30)} day agos`,
  lastActivity: `${random(1,30)} day agos`
}))
const initialState = {
  createIamUser: {
    userName: '',
    passWord: '',
    permisstion: '',
  },
  editIamUser:{
    id: '',
    userName: '',
    permisstion: '',
    accessKeyAge: '',
    passwordAge: '',
    lastActivity: ''
  },
  listUser: dummyData,
  searchIamUser: '',
}
const sortIncrease=(data: Array<user>, key: number)=>{
  switch(key){
  case 1: 
    data.sort((a,b)=>{
      if(a.userName<b.userName) 
        return -1
      if(a.userName>b.userName) 
        return 1
      return 0
    })   
    break
  case 2:
    data.sort((a,b)=>{
      if(a.permisstion<b.permisstion) return -1
      if(a.permisstion>b.permisstion) return 1
      return 0
    })
    break
  case 3:
    data.sort((a,b)=>{
      if(a.accessKeyAge<b.accessKeyAge) return -1
      if(a.accessKeyAge>b.accessKeyAge) return 1
      return 0
    })
    break
  case 4:
    data.sort((a,b)=>{
      if(a.passwordAge<b.passwordAge) return -1
      if(a.passwordAge>b.passwordAge) return 1
      return 0
    })
    break
  case 5:
    data.sort((a,b)=>{
      if(a.lastActivity<b.lastActivity) return -1
      if(a.lastActivity>b.lastActivity) return 1
      return 0
    })
    break
  }
  return data
}
const sortDecrease=(data: Array<user>, key: number)=>{
  sortIncrease(data,key).reverse()
}
const handleSort =(data: Array<user>, key: number)=>{
  data=data.concat()
  if(data.length>1){
    if(key==1){
      for(let i=1; i< data.length;i++){
        if(data[0].userName !=data[i].userName && data[0].userName> data[i].userName){
          sortIncrease(data,key)
          break
        }
        if(data[0].userName !=data[i].userName && data[0].userName< data[i].userName){
          sortDecrease(data,key)
          break
        }
      }
    }
    if(key==2){
      for(let i=1; i< data.length;i++){
        if(data[0].permisstion !=data[i].permisstion && data[0].permisstion> data[i].permisstion){
          sortIncrease(data,key)
          break
        }
        if(data[0].permisstion !=data[i].permisstion && data[0].permisstion< data[i].permisstion){
          sortDecrease(data,key)
          break
        }
      }
    }
    if(key==3){
      for(let i=1; i< data.length;i++){
        if(data[0].accessKeyAge !=data[i].accessKeyAge && data[0].accessKeyAge> data[i].accessKeyAge){
          sortIncrease(data,key)
          break
        }
        if(data[0].accessKeyAge !=data[i].accessKeyAge && data[0].accessKeyAge< data[i].accessKeyAge){
          sortDecrease(data,key)
          break
        }
      }
    } 
    if(key==4){
      for(let i=1; i< data.length;i++){
        if(data[0].passwordAge !=data[i].passwordAge && data[0].passwordAge> data[i].passwordAge){
          sortIncrease(data,key)
          break
        }
        if(data[0].passwordAge !=data[i].passwordAge && data[0].passwordAge< data[i].passwordAge){
          sortDecrease(data,key)
          break
        }
      }
    }
    if(key==5){
      for(let i=1; i< data.length;i++){
        if(data[0].lastActivity !=data[i].lastActivity && data[0].lastActivity> data[i].lastActivity){
          sortIncrease(data,key)
          break
        }
        if(data[0].lastActivity !=data[i].lastActivity && data[0].lastActivity< data[i].lastActivity){
          sortDecrease(data,key)
          break
        }
      }
    }       

  }
  return data
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
    sortIamUser: (state, action) => {
      state.listUser= handleSort(state.listUser, action.payload)
    },
    editIamUser:(state,action)=>{
      state.editIamUser=action.payload
    },
    editIamUserFormChange:(state,action)=>{
      state.editIamUser={
        ...state.editIamUser,
        ...action.payload
      }
    },
    searchUser: (state,action)=>{
      state.searchIamUser=action.payload
    }

  },
});

const { reducer, actions } = userListSlice;
export const { createIamUser, sortIamUser,editIamUser,editIamUserFormChange,searchUser } = actions
export default reducer
