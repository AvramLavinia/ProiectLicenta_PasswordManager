import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-hooks";

export type AuthState = {
  isLoading: boolean;
  isLogged: boolean;
  accessToken: string | undefined | null;
};

const initialState: AuthState = {
  isLoading: true,
  isLogged: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    loggedOut: (state) => {
      return { ...state, isLogged: false, accessToken: null, isLoading: false };
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export const selectAuthValue = (state: RootState) => state.auth;

export default authSlice.reducer;
