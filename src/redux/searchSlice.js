// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as productsApi from "../api/products";
// import { getErrorMessage } from "../api/error";



// export const searchProducts = createAsyncThunk(
//   "search/searchProducts",
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const res = await productsApi.searchProducts(searchTerm)
//       return res.data.data.products
//     } catch (error) {
//       return rejectWithValue(getErrorMessage(error))
//     }
//   }
// )


// export const detailsProducts = createAsyncThunk(
//   "details/detailsProducts" , 
//   async(id , {rejectWithValue}) =>{
//     try{
//       const res = await productsApi.detailsProducts(id)
//             return res.data.data.products

//     }catch(error) {
//             return rejectWithValue(getErrorMessage(error))


//     }
//   }
// )

// const initialState = {
//   results: [],
//   productDetails: null, // لتفاصيل المنتج المفرد
//   status: "idle",
//   error: null,
// }


// const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   reducers: {
//     // بتتنادى لما اليوزر يمسح كلمة البحث أو يقفل الـ dropdown
//     clearSearchResults: (state) => {
//       state.results = [];
//      state. productDetails = null
//       state.status = "idle"
//       state.error = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(searchProducts.pending, (state) => {
//         state.status = "loading"
//         state.error = null
//       })
//       .addCase(searchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded"
//         state.results = action.payload
//       })
//       .addCase(searchProducts.rejected, (state, action) => {
//         state.status = "failed"
//         state.error = action.payload
//       })

//             .addCase(detailsProducts.pending, (state) => {
//         state.status = "loading"
//         state.error = null
//       })
//       .addCase(detailsProducts.fulfilled, (state, action) => {
//         state.status = "succeeded"
//         state.productDetails = action.payload
//       })
//       .addCase(detailsProducts.rejected, (state, action) => {
//         state.status = "failed"
//         state.error = action.payload
//       })


//   },
// })
 
// export const { clearSearchResults } = searchSlice.actions
// export default searchSlice.reducer



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as productsApi from "../api/products";
// import { getErrorMessage } from "../api/error";

// export const searchProducts = createAsyncThunk(
//   "search/searchProducts",
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const res = await productsApi.searchProducts(searchTerm);

//       return {
//         products: res.data.data.products,
//         searchTerm,
//       };
//     } catch (error) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const detailsProducts = createAsyncThunk(
//   "details/detailsProducts",
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await productsApi.detailsProducts(id);

//       return res.data.data.products;
//     } catch (error) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// const initialState = {
//   results: [],
//   searchTerm: "",
//   productDetails: null,
//   status: "idle",
//   error: null,
// };

// const searchSlice = createSlice({
//   name: "search",

//   initialState,

//   reducers: {
//     clearSearchResults: (state) => {
//       state.results = [];
//       state.searchTerm = "";
//       state.productDetails = null;
//       state.status = "idle";
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // Search
//       .addCase(searchProducts.pending, (state, action) => {
//         state.status = "loading";
//         state.error = null;

//         // حفظ كلمة البحث في Redux
//         state.searchTerm = action.meta.arg;
//       })

//       .addCase(searchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         state.results = action.payload.products;
//         state.searchTerm = action.payload.searchTerm;
//       })

//       .addCase(searchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Details
//       .addCase(detailsProducts.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })

//       .addCase(detailsProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.productDetails = action.payload;
//       })

//       .addCase(detailsProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearSearchResults } = searchSlice.actions;

// export default searchSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productsApi from "../api/products";
import { getErrorMessage } from "../api/error";

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const res = await productsApi.searchProducts(searchTerm);

      return {
        products: res.data.data.products,
        searchTerm,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const detailsProducts = createAsyncThunk(
  "details/detailsProducts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await productsApi.detailsProducts(id);

      return res.data.data.product;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  results: [],
  searchTerm: "",
  productDetails: null,
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.searchTerm = "";
      state.productDetails = null;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Search
      .addCase(searchProducts.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.searchTerm = action.meta.arg;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload.products;
        state.searchTerm = action.payload.searchTerm;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Details
      .addCase(detailsProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(detailsProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload;
      })

      .addCase(detailsProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;



