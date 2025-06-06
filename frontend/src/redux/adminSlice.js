import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  stats: {
    totalUsers: 0,
    totalTickets: 0,
    activeTickets: 0,
  },
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAdmin: (state) => {
      state.users = [];
      state.stats = {
        totalUsers: 0,
        totalTickets: 0,
        activeTickets: 0,
      };
      state.loading = false;
      state.error = null;
    },
  },
});

export const { 
  setUsers, 
  setStats, 
  setLoading, 
  setError, 
  clearAdmin 
} = adminSlice.actions;

export default adminSlice.reducer; 