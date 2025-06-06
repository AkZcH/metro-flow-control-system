import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentTicket: (state, action) => {
      state.currentTicket = action.payload;
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
    clearTickets: (state) => {
      state.tickets = [];
      state.currentTicket = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { 
  setTickets, 
  setCurrentTicket, 
  setLoading, 
  setError, 
  clearTickets 
} = ticketSlice.actions;

export default ticketSlice.reducer; 