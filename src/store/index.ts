// Redux Store Configuration

// Import the necessary dependencies and modules
import { configureStore } from '@reduxjs/toolkit';
import urlsReducer from './urlsSlice';

// Configure the Redux store using configureStore from Redux Toolkit
export const store = configureStore({
  // Define the store's initial state and reducers
  reducer: {
    urls: urlsReducer, // Assign the urlsReducer to manage the 'urls' slice of the store
  },
});

// Define the RootState type by using ReturnType on the store.getState() function
export type RootState = ReturnType<typeof store.getState>;
