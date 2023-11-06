import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-hooks";

export type PasswordState = {
  id: string;
  platform: string;
  email: string;
  password: string;
};

const initialState: PasswordState[] = [];

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setPasswords: (state, action: PayloadAction<PasswordState[]>) => {
      return [...state, ...action.payload];
    },
    addPassword: (state, action: PayloadAction<PasswordState>) => {
      return [...state, action.payload];
    },
    updatePassword: (state, action: PayloadAction<PasswordState>) => {
      return state.map((value) => {
        if (value.id === action.payload.id) {
          return { ...value, ...action.payload };
        }
        return value;
      });
    },
    deletePassword: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((value) => value.id !== action.payload.id);
    },

    resetPassword: () => {
      return initialState;
    },
  },
});

export const {
  setPasswords,
  deletePassword,
  updatePassword,
  addPassword,
  resetPassword,
} = passwordSlice.actions;
export const selectPasswordValue = (state: RootState) => state.password;

export default passwordSlice.reducer;
