import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'app/userSlice';
import userlistReducer from './userlist/userliststore'
const rootReducer = {
  user: userReducer,
  userlistReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
