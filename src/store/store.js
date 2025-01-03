// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Create the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart slice to the store
  },
});

export default store;
