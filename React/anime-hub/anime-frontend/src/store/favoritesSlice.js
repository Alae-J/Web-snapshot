// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload;
    },
    addFavorite(state, action) {
      state.items.push(action.payload);
    }
  }
});

export const { setFavorites, addFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
