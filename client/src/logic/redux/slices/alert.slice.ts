import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertProps } from "./alert.slice.types";
import { RootState } from "../redux-hooks";

const initialState: AlertProps = {
  description: null,
  type: "ERROR",
  position: "BOTTOM",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Partial<AlertProps>>) => {
      const type =
        action.payload?.type === undefined ? "ERROR" : action.payload?.type;
      const position =
        action.payload?.position === undefined
          ? "BOTTOM"
          : action.payload?.position;
      return { ...state, ...action.payload, type, position };
    },

    resetAlert: (state) => {
      return initialState;
    },
  },
});

export const { setAlert, resetAlert } = alertSlice.actions;
export const selectAlertValue = (state: RootState) => state.alert;

export default alertSlice.reducer;
