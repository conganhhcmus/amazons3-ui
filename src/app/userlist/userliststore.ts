import { createSlice } from '@reduxjs/toolkit';

export interface fake {
  userName: string;
  permisstion: string;
  accessKeyAge: string;
  passwordAge: string;
  lastAcctivity: string;
}

const fake1: fake[] = [
  {
    userName: '921',
    permisstion: 'fullaccess',
    accessKeyAge: '20 day ago',
    passwordAge: '15 day ago',
    lastAcctivity: '15 day ago',
  },
  {
    userName: 'boy2ball',
    permisstion: 'fullaccess',
    accessKeyAge: '1 day ago',
    passwordAge: '1 day ago',
    lastAcctivity: '1 day ago',
  },
  {
    userName: 'boy1balls',
    permisstion: 'noaccess',
    accessKeyAge: '13 day ago',
    passwordAge: '12 day ago',
    lastAcctivity: '16 day ago',
  },
  {
    userName: 'boy41ball',
    permisstion: 'writeonly',
    accessKeyAge: '1 day ago',
    passwordAge: '1 day ago',
    lastAcctivity: '1 day ago',
  },
  {
    userName: 'boy21ball',
    permisstion: 'readonly',
    accessKeyAge: '13 day ago',
    passwordAge: '17 day ago',
    lastAcctivity: '10 day ago',
  },
  {
    userName: 'boy61ball',
    permisstion: 'fullaccess',
    accessKeyAge: '11 day ago',
    passwordAge: '12 day ago',
    lastAcctivity: '13 day ago',
  },
  {
    userName: 'boy31ball',
    permisstion: 'fullaccess',
    accessKeyAge: '13 day ago',
    passwordAge: '12 day ago',
    lastAcctivity: '17 day ago',
  },
  {
    userName: 'boy51ball',
    permisstion: 'fullaccess',
    accessKeyAge: '18 day ago',
    passwordAge: '16 day ago',
    lastAcctivity: '14 day ago',
  },
  {
    userName: 'boy01ball',
    permisstion: 'fullaccess',
    accessKeyAge: '21 day ago',
    passwordAge: '31 day ago',
    lastAcctivity: '41 day ago',
  },
  {
    userName: 'boy15ball',
    permisstion: 'fullaccess',
    accessKeyAge: '15 day ago',
    passwordAge: '15 day ago',
    lastAcctivity: '15 day ago',
  },
  {
    userName: '921',
    permisstion: 'fullaccess',
    accessKeyAge: '15 day ago',
    passwordAge: '15 day ago',
    lastAcctivity: '15 day ago',
  },
  {
    userName: '921',
    permisstion: 'fullaccess',
    accessKeyAge: '20 day ago',
    passwordAge: '15 day ago',
    lastAcctivity: '15 day ago',
  },
]
const initialState = {
  createIamUser: {
    userName: '',
    passWord: '',
    permisstion: '',
  },
  listUser: fake1,
}
const sortIncrease=(data: Array<fake>, key: number)=>{
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
      if(a.lastAcctivity<b.lastAcctivity) return -1
      if(a.lastAcctivity>b.lastAcctivity) return 1
      return 0
    })
    break
  }
  return data
}
const sortDecrease=(data: Array<fake>, key: number)=>{
  sortIncrease(data,key).reverse()
}
const handleSort =(data: Array<fake>, key: number)=>{
  data=data.concat()
  if(data.length>1){
    console.log('key',key)
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
    else{
      for(let i=1; i< data.length;i++){
        if(data[0].lastAcctivity !=data[i].lastAcctivity && data[0].lastAcctivity> data[i].lastAcctivity){
          sortIncrease(data,key)
          break
        }
        if(data[0].lastAcctivity !=data[i].lastAcctivity && data[0].lastAcctivity< data[i].lastAcctivity){
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
    sortUser: (state, action) => {
      state.listUser= handleSort(state.listUser, action.payload)
    },
  },
});

const { reducer, actions } = userListSlice;
export const { createIamUser, sortUser } = actions;
export default reducer;
