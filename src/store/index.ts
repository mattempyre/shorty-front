import { configureStore } from '@reduxjs/toolkit';
import urlsReducer from './urlsSlice';

export const store = configureStore({
  reducer: {
    urls: urlsReducer,
  },
});
