import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-hooks";

export type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
};

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    deleteUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, updateUser, deleteUser } = userSlice.actions;
export const selectUserValue = (state: RootState) => state.user;

export default userSlice.reducer;
