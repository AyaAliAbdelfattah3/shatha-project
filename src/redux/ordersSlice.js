import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ordersApi from '../api/orders'; 

// 1. جلب كل الطلبات
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await ordersApi.getAllOrders();
    // حسب شكل الـ Response اللي شفناه في البوستمان: response.data.data.orders
    return response.data.data.orders; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

// 2. تغيير حالة الطلب
export const changeOrderStatus = createAsyncThunk('orders/changeOrderStatus', async ({ orderId, status }, { rejectWithValue }) => {
  try {
    await ordersApi.updateOrderStatus(orderId, status);
    return { orderId, status };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update status');
  }
});

// 3. حذف طلب
export const removeOrder = createAsyncThunk('orders/removeOrder', async (orderId, { rejectWithValue }) => {
  try {
    await ordersApi.deleteOrder(orderId);
    return orderId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete order');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { 
    orders: [], 
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- جلب الطلبات ---
      .addCase(fetchOrders.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchOrders.fulfilled, (state, action) => { 
        state.loading = false; 
        state.orders = action.payload; 
      })
      .addCase(fetchOrders.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })
      
      // --- تغيير الحالة ---
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        // بندور على الطلب بالـ id ونغير حالته
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
          order.status = status;
        }
      })
      
      // --- الحذف ---
      .addCase(removeOrder.fulfilled, (state, action) => {
        // بنشيل الطلب من الـ State
        state.orders = state.orders.filter(o => o.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;