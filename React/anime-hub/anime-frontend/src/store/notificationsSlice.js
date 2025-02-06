// src/store/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
  },
  reducers: {
    addNotification(state, action) {
      state.items.push(action.payload);
    },
    removeNotification(state, action) {
      console.log("Removing notification with id:", action.payload); // Debug log
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearNotifications(state) {
      state.items = [];
    }
  }
});

export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
