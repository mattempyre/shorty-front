// src/store/urlsSlice.ts
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

const urlsSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    // Add a URL to the state
    addUrl: (state, action: PayloadAction<Url>) => {
      state.push(action.payload);
    },

    // Remove a URL from the state by its shortUrl
    removeUrl: (state, action: PayloadAction<string>) => {
      return state.filter((url) => url.shortUrl !== action.payload);
    },

    // Update the click count for a URL by its shortUrl
    updateClickCount: (
      state,
      action: PayloadAction<{ shortUrl: string; clickCount: number }>
    ) => {
      const { shortUrl, clickCount } = action.payload;
      const urlToUpdate = state.find((url) => url.shortUrl === shortUrl);
      if (urlToUpdate) {
        urlToUpdate.clickCount = clickCount;
      }
    },

    // Update the long URL for a URL by its shortUrl
    updateLongUrl: (
      state,
      action: PayloadAction<{ shortUrl: string; newLongUrl: string }>
    ) => {
      const { shortUrl, newLongUrl } = action.payload;
      const urlToUpdate = state.find((url) => url.shortUrl === shortUrl);
      if (urlToUpdate) {
        urlToUpdate.longUrl = newLongUrl;
      }
    },
    // Add a new action to fetch URLs from the API and update the state
    fetchUrls: (_, action: PayloadAction<Url[]>) => {
      return action.payload;
    },
  },
});

// Export your actions and reducer
export const { addUrl, removeUrl, updateClickCount, updateLongUrl, fetchUrls } =
  urlsSlice.actions;

export default urlsSlice.reducer;
