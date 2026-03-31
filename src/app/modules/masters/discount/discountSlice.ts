import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDiscounts, deleteDiscount } from "./discountService";
import { DiscountType, DiscountState } from "./discountTypes"; 

export const fetchDiscounts = createAsyncThunk(
  "discounts/fetch",
  async () => await getDiscounts()
);

export const removeDiscount = createAsyncThunk(
  "discounts/delete",
  async (id: string) => {
    await deleteDiscount(id);
    return id; 
  }
);

const initialState: DiscountState = {
  list: [],
  loading: false,
  error: undefined,
};

const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDiscounts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeDiscount.fulfilled, (state, action) => {
        state.list = state.list.filter(d => d.id !== action.payload);
      });
  },
});

export default discountSlice.reducer;