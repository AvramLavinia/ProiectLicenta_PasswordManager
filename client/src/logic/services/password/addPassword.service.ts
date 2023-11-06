import React, { useState } from "react";
import { UseAppDispatch } from "../../redux/redux-hooks";
import { addPasswordRequest } from "../../requests/password.requests";
import { addPassword } from "../../redux/slices/password.slice";
import { setAlert } from "../../redux/slices/alert.slice";

export type AddPasswordState = {
  platform: string;
  email: string;
  password: string;
};

const AddPasswordService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const addPasswordEvent = async (object: AddPasswordState) => {
    return await addPasswordRequest(object)
      .then((res) => {
        dispatch(addPassword(res.data));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setAlert({ description: "Something goes wrong" }));
        setLoading(false);
      });
  };

  return { addPasswordEvent, loading, setLoading };
};

export default AddPasswordService;
