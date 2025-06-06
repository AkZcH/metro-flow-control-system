import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ticketReducer from './ticketSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ticket: ticketReducer,
    admin: adminReducer,
  },
}); 