import React, { useState } from "react";
import { UseAppDispatch } from "../../redux/redux-hooks";
import { updatePasswordRequest } from "../../requests/password.requests";
import {
  PasswordState,
  updatePassword,
} from "../../redux/slices/password.slice";
import { setAlert } from "../../redux/slices/alert.slice";

const UpdatePasswordService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const updatePasswordEvent = async (object: PasswordState) => {
    setLoading(true);
    return await updatePasswordRequest(object)
      .then((res) => {
        dispatch(updatePassword(res.data));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setAlert({ description: "Something goes wrong" }));
        setLoading(false);
      });
  };

  return { updatePasswordEvent, loading };
};

export default UpdatePasswordService;
