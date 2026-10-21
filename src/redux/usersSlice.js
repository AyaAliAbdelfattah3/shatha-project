import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersApi from "../api/users";
// Thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await usersApi.getAllUsers();
    return response.data.data.users; // زي ما شفنا في البوستمان
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

export const changeUserRole = createAsyncThunk('users/changeUserRole', async ({ userId, role }, { rejectWithValue }) => {
  try {
    await usersApi.updateUserRole(userId, role);
    return { userId, role };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update role');
  }
});

export const removeUser = createAsyncThunk('users/removeUser', async (userId, { rejectWithValue }) => {
  try {
    await usersApi.deleteUser(userId);
    return userId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Role
      .addCase(changeUserRole.fulfilled, (state, action) => {
        const { userId, role } = action.payload;
        const user = state.users.find(u => u.id === userId);
        if (user) user.role = role;
      })
      // Delete
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;