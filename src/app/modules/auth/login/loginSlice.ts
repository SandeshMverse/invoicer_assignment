import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "./loginService";
import { AuthState, LoginPayload, User } from "./loginTypes";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<User, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const user = await loginUser(payload.email, payload.password);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;