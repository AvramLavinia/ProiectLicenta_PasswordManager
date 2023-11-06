import React, { useState } from "react";
import { UseAppDispatch } from "../../redux/redux-hooks";
import { deletePasswordRequest } from "../../requests/password.requests";
import {
  PasswordState,
  deletePassword,
} from "../../redux/slices/password.slice";
import { setAlert } from "../../redux/slices/alert.slice";

const DeletePasswordService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const deletePasswordEvent = async (object: PasswordState) => {
    setLoading(true);
    return await deletePasswordRequest(object.id)
      .then((res) => {
        dispatch(deletePassword({ id: res.data.id }));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setAlert({ description: "Something goes wrong" }));
        setLoading(false);
      });
  };

  return { deletePasswordEvent, loading };
};

export default DeletePasswordService;
