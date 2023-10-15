import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice"
import loaderReducer from "./slices/loaderSlice.js"

export const store = configureStore({
  reducer: {
     user: userReducer,
     loader : loaderReducer
  },
});
