import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice"
import loaderReducer from "./slices/loaderSlice.js"
import modalReducer from "./slices/modalSlice"
import idReducer from "./slices/idSlice"

export const store = configureStore({
  reducer: {
     user: userReducer,
     loader : loaderReducer,
     modal : modalReducer,
     id : idReducer
  },
});
