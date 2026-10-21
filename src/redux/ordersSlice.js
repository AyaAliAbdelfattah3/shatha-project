import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ordersApi from '../api/orders'; 

// 1. جلب كل الطلبات (للأدمن)
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await ordersApi.getAllOrders();
    return response.data.data.orders; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

// 2. جلب طلبات العميل اللي عامل Login (My Orders)
export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await ordersApi.getMyOrders();
    return response.data.data.orders; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch your orders');
  }
});

// 3. تغيير حالة الطلب (للأدمن)
export const changeOrderStatus = createAsyncThunk('orders/changeOrderStatus', async ({ orderId, status }, { rejectWithValue }) => {
  try {
    await ordersApi.updateOrderStatus(orderId, status);
    return { orderId, status };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update status');
  }
});

// 4. حذف طلب (للأدمن)
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
    orders: [], // بتاعة الأدمن
    myOrders: [], // بتاعة العميل
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- جلب الطلبات (أدمن) ---
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

      // --- جلب طلبات العميل (User) ---
      .addCase(fetchMyOrders.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { 
        state.loading = false; 
        state.myOrders = action.payload; 
      })
      .addCase(fetchMyOrders.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })
      
      // --- تغيير الحالة ---
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
          order.status = status;
        }
      })
      
      // --- الحذف ---
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(o => o.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;