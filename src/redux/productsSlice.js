import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productsApi from "../api/products";
import { getErrorMessage } from "../api/error";


//This function is responsible for requesting products from the server and informs you via `thunk` whether the request is loading/successful/failed so that we can update the screen appearance for the user based on this status.

//عدلتها علشان باقى البرامز الباجينيشن وغيرها 
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  // async (_, { rejectWithValue }) => {
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await productsApi.getProducts(params);
      return res.data.data;
    } catch (error) {
      console.log("تفاصيل الخطأ الحقيقي من السيرفر:", error.response); // ضيفي السطر ده هنا
      return rejectWithValue(getErrorMessage(error));
    }
  },
);



//This function is responsible for requesting categories from the server

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async(_, {rejectWithValue}) =>{
    try{
      const res = await productsApi.getCategories()
      return res.data.data

    }catch(error){
      return rejectWithValue(getErrorMessage(error))

    }
  }
)


//This function is responsible for requesting featured from the server
export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeatured",
  async(_, {rejectWithValue}) =>{
    try{
      const res = await productsApi.getFeaturedProducts()
      return res.data.data.products

    }catch(error){
      return rejectWithValue(getErrorMessage(error))

    }
  }
)



//This function is responsible for requesting newest from the server
export const fetchLatestProducts = createAsyncThunk(
  "products/fetchLatest",
  async(_, {rejectWithValue}) =>{
    try{
      const res = await productsApi.getLatestProducts ()
      return res.data.data.products

    }catch(error){
      return rejectWithValue(getErrorMessage(error))

    }
  }
)

//admin
// 1. دالة إضافة منتج
export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await productsApi.createProduct(formData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 2. دالة تعديل منتج
export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await productsApi.updateProduct(id, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 3. دالة حذف منتج
export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await productsApi.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

//الحاله المبدئيه اللى المقع بيفتح عليها

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  totalProducts: 0,
  status: "idle",
  error: null,

  categories:[],
  categoriesStatus: "idle",  
  featuredItems:[],
  featuredStatus: "idle",

  latestItems : [],
  latestStatus:"idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // 1. أضفنا هذا الأكشن لتغيير رقم الصفحة
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

    //products
    .addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })


    .addCase(fetchProducts.fulfilled, (state,action) => {
      state.status = "succeeded",
      state.items = action.payload.products,
      state.page = action.payload.page,
      state.totalPages = action.payload.totalPages,
      state.totalProducts = action.payload.totalProducts
    })


    .addCase(fetchProducts.rejected , (state,action) =>{
      state.status ="failed",
      state.error = action.payload
    })



//categories

.addCase(fetchCategories.pending, (state) =>{
  state.categoriesStatus ="loading";
})

.addCase(fetchCategories.fulfilled, (state , action) =>{
  state.categoriesStatus ="succeeded";
  state.categories = action.payload
})

.addCase(fetchCategories.rejected, (state) =>{
  state.categoriesStatus ="failed";
})







//featured
.addCase(fetchFeaturedProducts.pending, (state) =>{
  state.featuredStatus ="loading";
})

.addCase(fetchFeaturedProducts.fulfilled, (state , action) =>{
  state.featuredStatus ="succeeded";
  state.featuredItems = action.payload
})

.addCase(fetchFeaturedProducts.rejected, (state) =>{
  state.featuredStatus ="failed";
})



//newest
.addCase(fetchLatestProducts.pending, (state) =>{
  state.latestStatus ="loading";
})

.addCase(fetchLatestProducts.fulfilled, (state , action) =>{
  state.latestStatus ="succeeded";
  state.latestItems = action.payload
})

.addCase(fetchLatestProducts.rejected, (state) =>{
  state.latestStatus ="failed";
})





// ثم داخل الـ extraReducers نضمن تحديث القائمة فور الحذف أو الإضافة:
//admin
.addCase(createProductThunk.fulfilled, (state, action) => {
  state.items.unshift(action.payload);
})
.addCase(deleteProductThunk.fulfilled, (state, action) => {
  state.items = state.items.filter((item) => (item._id || item.id) !== action.payload);
})

// 3. تعديل منتج محلياً فور النجاح
.addCase(updateProductThunk.fulfilled, (state, action) => {
  const updatedProduct = action.payload;
  const index = state.items.findIndex(
    (item) => (item._id || item.id) === (updatedProduct._id || updatedProduct.id)
  );
  if (index !== -1) {
    state.items[index] = updatedProduct; // استبدال بيانات المنتج القديم بالجديد فوراً
  }
})

  },
});
export const { setPage } = productsSlice.actions;
export default productsSlice.reducer;
