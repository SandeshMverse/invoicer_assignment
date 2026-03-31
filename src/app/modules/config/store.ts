import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/login/loginSlice";
import productReducer from "../masters/products/productSlice";
import discountReducer from "../masters/discount/discountSlice";
import { loadAuth } from "./persist";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        discounts: discountReducer,
    },
    preloadedState: {
        auth: loadAuth(),
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;