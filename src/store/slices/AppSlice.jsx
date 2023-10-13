import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    featuredProducts: [],
    singleProduct: {},
    isSingleLoading: false,
    singleProductReview: []
}

const API = 'https://api.pujakaitem.com/api/products'

export const getProducts = createAsyncThunk('app/getProducts', async () =>{
    try {
        const res = await axios(API)
        return res.data
    } catch (error) {
        throw error
    }
})

export const getSingleProduct = createAsyncThunk('app/getSingleProduct', async (url) =>{
    try {
        const res = await axios(url)
        return res.data
    } catch (error) {
        throw error
    }
})

export const getSingleProductReviews = createAsyncThunk('app/getSingleProductReviews', async (id) =>{
    try {
        const res = await axios(`http://localhost:3000/reviews?productId=${id}`)
        return res.data
    } catch (error) {
        throw error
    }
})

export const AddProductReviews = createAsyncThunk('app/AddProductReviews', async (data) =>{
    try {
        const res = await axios.post(`http://localhost:3000/reviews` ,  data)
        return res.data
    } catch (error) {
        throw error
    }
})

const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        getSingleProductReview : (state, action) =>{
            state.singleProductReview = action.payload;
        }
    },
    extraReducers : (builder) =>{
        builder
        .addCase(getProducts.fulfilled, (state, action) => {
            let featuredProducts = action.payload.filter((elem) => elem.featured === true)
            state.products = action.payload;
            state.featuredProducts = featuredProducts
          })
          .addCase(getSingleProduct.pending, (state) => {
            state.isSingleLoading = true
          })
          .addCase(getSingleProduct.fulfilled, (state, action) => {
            state.isSingleLoading = false
            state.singleProduct = action.payload;
          })
          .addCase(getSingleProduct.rejected, (state, action) => {
            state.isSingleLoading = false
            state.singleProduct = action.payload;
          })
          .addCase(getSingleProductReviews.fulfilled, (state, action) => {
            state.singleProductReview = action.payload;
          })
          .addCase(AddProductReviews.fulfilled, (state, action) => {
            state.singleProductReview.push(action.payload);
          })
    }
})

export const {getSingleProductReview} = AppSlice.actions

export const AppReducer = AppSlice.reducer