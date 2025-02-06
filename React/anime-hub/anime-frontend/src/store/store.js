// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import notificationsReducer from './notificationsSlice';
import uiReducer from './uiSlice';
import searchReducer from './searchSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    notifications: notificationsReducer,
    ui: uiReducer,
    search: searchReducer,
  },
});
