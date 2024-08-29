import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserStateData = {
  id: string;
  username: string;
  name: string;
  email: string;
  profilePicture?: string
};

export interface AuthState {
  isAuthenticated: boolean;
  user: UserStateData | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserStateData>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
