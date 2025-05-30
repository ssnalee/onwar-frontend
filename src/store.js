import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './store/counterSlice';
import themeReducer from './store/themeSlice';
import userReducer from './store/userSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme : themeReducer,
    user : userReducer,
  },
});