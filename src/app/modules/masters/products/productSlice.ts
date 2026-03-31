import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, ProductState } from "./productTypes";
import { getProducts, addProduct, updateProduct, deleteProduct } from "./productService";

export const fetchProducts = createAsyncThunk<Product[], void>(
    "products/fetch",
    async () => {
        return await getProducts();
    }
);

export const createProductThunk = createAsyncThunk<Product, Product>(
    "products/create",
    async (data) => {
        await addProduct(data);
        return data;
    }
);

export const updateProductThunk = createAsyncThunk<{ id: string; data: Product }, { id: string; data: Product }>(
    "products/update",
    async ({ id, data }) => {
        await updateProduct(id, data);
        return { id, data };
    }
);

export const deleteProductThunk = createAsyncThunk<string, string>(
    "products/delete",
    async (id) => {
        await deleteProduct(id);
        return id;
    }
);


const initialState: ProductState = {
    list: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })

            .addCase(createProductThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.error = action.error.message ?? null;
            })

            .addCase(updateProductThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                const index = state.list.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) state.list[index] = { ...state.list[index], ...action.payload.data };
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.error = action.error.message ?? null;
            })

            .addCase(deleteProductThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.list = state.list.filter((p) => p.id !== action.payload);
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.error = action.error.message ?? null;
            });
    },
});

export default productSlice.reducer;