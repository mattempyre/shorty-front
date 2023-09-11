// src/store/urlsSlice.ts

// Import necessary functions and types from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a URL object
interface Url {
  shortUrl: string; // Use shortUrl as the unique identifier
  longUrl: string;
  clickCount: number;
  redirectUrl: string; // Add the redirectUrl property
}

// Define the initial state with an empty array of URLs
const initialState: Url[] = [];

// Create a Redux slice using createSlice
const urlsSlice = createSlice({
  name: 'urls', // Name of the slice
  initialState, // Initial state for this slice
  reducers: {
    // Add a URL to the state
    addUrl: (state, action: PayloadAction<Url>) => {
      state.push(action.payload); // Push the new URL into the state array
    },

    // Remove a URL from the state by its shortUrl
    removeUrl: (state, action: PayloadAction<string>) => {
      return state.filter((url) => url.shortUrl !== action.payload);
      // Filter out the URL with the matching shortUrl, effectively removing it from the state
    },

    // Update the click count for a URL by its shortUrl
    updateClickCount: (
      state,
      action: PayloadAction<{ shortUrl: string; clickCount: number }>
    ) => {
      const { shortUrl, clickCount } = action.payload;
      const urlToUpdate = state.find((url) => url.shortUrl === shortUrl);
      // Find the URL object with the matching shortUrl
      if (urlToUpdate) {
        urlToUpdate.clickCount = clickCount;
        // Update the clickCount property of the found URL object
      }
    },

    // Update the long URL for a URL by its shortUrl
    updateLongUrl: (
      state,
      action: PayloadAction<{ shortUrl: string; newLongUrl: string }>
    ) => {
      const { shortUrl, newLongUrl } = action.payload;
      const urlToUpdate = state.find((url) => url.shortUrl === shortUrl);
      // Find the URL object with the matching shortUrl
      if (urlToUpdate) {
        urlToUpdate.longUrl = newLongUrl;
        // Update the longUrl property of the found URL object
      }
    },

    // Add a new action to fetch URLs from the API and update the state
    fetchUrls: (_, action: PayloadAction<Url[]>) => {
      return action.payload; // Replace the state with the fetched URLs
    },
  },
});

// Export your actions and reducer
export const { addUrl, removeUrl, updateClickCount, updateLongUrl, fetchUrls } =
  urlsSlice.actions;

export default urlsSlice.reducer;
