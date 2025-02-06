import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    filters: { 
      genres: [], 
      rating: '', 
      status: '' 
    },
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { setQuery, setFilters } = searchSlice.actions;
export default searchSlice.reducer;
