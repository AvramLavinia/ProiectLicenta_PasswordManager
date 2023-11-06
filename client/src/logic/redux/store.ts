import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice";
import userSlice from "./slices/user.slice";
import passwordSlice from "./slices/password.slice";
import alertSlice from "./slices/alert.slice";
import noticesSlice from "./slices/notices.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    password: passwordSlice,
    notice: noticesSlice,
    alert: alertSlice,
  },
});
