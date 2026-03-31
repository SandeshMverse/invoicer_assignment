import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDiscounts } from "./discountService";

export const fetchDiscounts = createAsyncThunk(
    "discounts/fetch",
    async () => {
        return await getDiscounts();
    }
);

const discountSlice = createSlice({
    name: "discounts",
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDiscounts.fulfilled, (state, action) => {
            state.list = action.payload as any;
        });
    },
});

export default discountSlice.reducer;