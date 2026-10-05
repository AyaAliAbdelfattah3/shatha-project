import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../api/error";
import * as authApi from "../api/auth";

//When the user enters the email and password and presses "Login"
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      //نفذ داله api for loginواعطيها الايميل والباسورد وانتظر الرد
      const res = await authApi.login(email, password);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

//When a new user fills out the "Create Account" form (name + email + password).
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await authApi.register(name, email, password);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

//من غيرها: كل مرة تعمل Refresh،
// هتضطر تعمل login تاني من الصفر رغم إنك أصلاً داخل!
//  اليوزر عمل login بنجاح
// الـ Redux state اتخزن فيها user
// اليوزر عمل F5 (Refresh)
// كل الـ Redux state بترجع لأول حالة (user: null) لأن الصفحة اتحملت من جديد!

// لكن... اليوزر لسه فعلياً "داخل" لأن التوكن لسه محفوظ (في cookie أو localStorage). فـ fetchMe بتيجي تقول:

// "استنى، خليني أسأل الباك اند: التوكن ده لسه شغال؟ لو أيوه، ابعتلي بيانات اليوزر تاني عشان أرجع أعمّر بيها الـ state."

//لولاها لكان المستخدم سجل دخول ف كل مره 
//هى بتسال السيرفر التوكن صالح ولا لا

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.meData ();
      return res.data.data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// export const logOut = createAsyncThunk(
//   "auth/logout", 
//   async () => {
//   await authApi.logout();
// });


export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return null; // البيانات المرجعة عند النجاح
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
     
    }
  }
);

const initialState = {
  // user: null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  initializing: Boolean(localStorage.getItem("token")),
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded", 
        state.user = action.payload.user
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })




      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded", 
        state.user = action.payload.user
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })





      .addCase(fetchMe.pending, (state) => {
        //نتحقق هل التوكن القديم صالح أم لا
        state.initializing = true;
      })

      
//عندما يؤكد السيرفر أن التوكن صالح
      .addCase(fetchMe.fulfilled, (state, action) => {

        state.initializing = false;
        // نأخذ بيانات المستخدم القادمة ونعيد وضعها في الـ state.user
        state.user = action.payload;
        // 🟢 تحديث بيانات المستخدم المخزنة
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      .addCase(fetchMe.rejected, (state) => {
        state.initializing = false;
        state.user = null;
        localStorage.removeItem("token")
        localStorage.removeItem("user");
      })




    .addCase(logOut.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(logOut.fulfilled, (state) => {
        // state.user = null
        // state.status = "idle"
        // localStorage.removeItem("token")
         state.user = null;
        state.status = "idle";
        state.error = null;
        state.initializing = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
    

      .addCase(logOut.rejected, (state , action) => {
        state.status = "idle";
        state.error = action.payload; // رسالة الخطأ من getErrorMessage
        state.user = null;
        state.initializing = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })

  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
