import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useFetch } from "./useFetch";


// Define the async thunk for fetching products and category data
export const fetchProductsData = createAsyncThunk('products/fetchProductsData', async () => {
    const response = await fetch('https://dummyjson.com/products');
    const jsonData = await response.json();
    localStorage.setItem('products',JSON.stringify(jsonData))
    return jsonData;
  });

  export const fetchCategoriesData = createAsyncThunk('categories/fetchCategoriesData', async () => {
    const response = await fetch('https://dummyjson.com/products/category-list');
    const jsonData = await response.json();
    return jsonData;
  });



const catalogSlice = createSlice({
    name: 'catalog',
    initialState : {
        categories : [],
        products : [],
        loading : false,
        error : null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProductsData.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProductsData.fulfilled, (state, action) => {
            state.loading = true;
            state.products = action.payload;
          })
          .addCase(fetchProductsData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchCategoriesData.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchCategoriesData.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
          })
          .addCase(fetchCategoriesData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})

//export const { setCategories, setProducts} = catalogSlice.actions;

export default catalogSlice.reducer;