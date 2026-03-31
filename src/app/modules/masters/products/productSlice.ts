import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, addProduct } from "./productService";
import { ProductState } from "./productTypes";

const initialState: ProductState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async () => {
        return await getProducts();
    }
);

export const createProduct = createAsyncThunk(
    "products/create",
    async (data: any) => {
        await addProduct(data);
        return data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload as any;
            });
    },
});

export default productSlice.reducer;