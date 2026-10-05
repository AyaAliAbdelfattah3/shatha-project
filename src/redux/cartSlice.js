import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getErrorMessage } from '../api/error';
import * as cartApi from "../api/cart";
import { logOut } from './authSlice';
//get cart
export const fetchCart = createAsyncThunk(
 "cart/fetchCart",
 async (_, { rejectWithValue }) => {
  try {
   const res = await cartApi.getCartItems();
      return res.data.data.cart;
  }
  catch (error) {
   return rejectWithValue(getErrorMessage(error));
  }
 })



// Add a product to the cart
export const addToCart = createAsyncThunk(
 "cart/addToCart",
 async (productData, { rejectWithValue }) => {
  try {
   const res = await cartApi.addToCart(productData);
      return res.data.data.cart;
  }
  catch (error) {
   return rejectWithValue(getErrorMessage(error));
  }
 }

)


// Update a product in the cart
export const updateQuantity  = createAsyncThunk(
 "cart/updateQuantity ",
 async ({ productId, quantity }, { rejectWithValue }) => {
  try {
   const res = await cartApi.updateQuantity (productId, { quantity });
      return res.data.data.cart;
  }
  catch (error) {
   return rejectWithValue(getErrorMessage(error));
  }
 })


 // Delete a product from the cart
export const deleteCartItem = createAsyncThunk(
 "cart/deleteCartItem",
 async (productId, { rejectWithValue }) => {
  try {
   const res = await cartApi.deleteCartItem(productId);
      return res.data.data.cart;
  }
  catch (error) {
   return rejectWithValue(getErrorMessage(error));
  }
 })

 // Clear the cart
export const clearCart = createAsyncThunk(
 "cart/clearCart",
 async (_, { rejectWithValue }) => {
  try {
   const res = await cartApi.clearCart();
      return res.data.data.cart;
  }
  catch (error) {
   return rejectWithValue(getErrorMessage(error));
  }
 }
 )





const emptyCart = { items: [], totalItems: 0, totalPrice: 0 };



const initialState = {
  cart: emptyCart,
 status: "idle",
 error: null,

}

const setCart = (state, action) => {
  state.status = "succeeded";
  state.cart = action.payload;
};

const setFailed = (state, action) => {
  state.status = "failed";
  state.error = action.payload;
};

export const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  // 👈 أضيفي هذه الدالة لتصفير السلة محلياً
    resetCart: (state) => {
      state.cart = emptyCart;
      state.status = "idle";
      state.error = null;
  },
 },
  extraReducers: (builder) => {
  builder

  
 .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, setCart)
      .addCase(fetchCart.rejected, setFailed)
      .addCase(addToCart.fulfilled, setCart)
      .addCase(addToCart.rejected, setFailed)
      .addCase(updateQuantity.fulfilled, setCart)
      .addCase(updateQuantity.rejected, setFailed)
      .addCase(deleteCartItem.fulfilled, setCart)
      .addCase(deleteCartItem.rejected, setFailed)
      .addCase(clearCart.fulfilled, setCart)
      .addCase(clearCart.rejected, setFailed)


      // 🟢 تصفير السلة تلقائياً عند تنفيذ تسجيل الخروج
      .addCase(logOut.fulfilled, (state) => {
        state.cart = emptyCart;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { resetCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cart.items;

export const selectCartCount = (state) => state.cart.cart.totalItems;

export const selectCartTotal = (state) => state.cart.cart.totalPrice;

export default cartSlice.reducer;