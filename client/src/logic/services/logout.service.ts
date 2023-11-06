import React from "react";
import { UseAppDispatch } from "../redux/redux-hooks";
import { loggedOut } from "../redux/slices/auth.slice";
import { deleteUser } from "../redux/slices/user.slice";
import { resetPassword } from "../redux/slices/password.slice";
import { resetNotice } from "../redux/slices/notices.slice";

const logoutService = () => {
  const dispatch = UseAppDispatch();

  const logout = async () => {
    console.log("Logged out the user!");

    localStorage.removeItem("accessToken");
    //Auth value in redux store
    dispatch(loggedOut());
    dispatch(deleteUser());
    dispatch(resetPassword());
    dispatch(resetNotice());
  };

  return { logout };
};

export default logoutService;
