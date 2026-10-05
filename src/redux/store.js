import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./authSlice"
import productsReducer from "./productsSlice"
import cartReducer from "./cartSlice"
import searchReducer from "./searchSlice"
export const store = configureStore({
  reducer: {
    auth : authReducer,
    products : productsReducer,
    cart: cartReducer, 
    search : searchReducer,
  },
})