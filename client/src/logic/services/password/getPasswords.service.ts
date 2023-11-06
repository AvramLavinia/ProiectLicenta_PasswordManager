import React, { useState } from "react";
import { UseAppDispatch } from "../../redux/redux-hooks";
import { getAllPasswordRequest } from "../../requests/password.requests";
import { setPasswords } from "../../redux/slices/password.slice";
import { setAlert } from "../../redux/slices/alert.slice";

const GetAllPasswordsService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllPasswordsEvent = async () => {
    setLoading(true);
    return await getAllPasswordRequest()
      .then((res) => {
        dispatch(setPasswords(res.data));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setAlert({ description: "Something goes wrong" }));
        setLoading(false);
      });
  };

  return { getAllPasswordsEvent, loading };
};

export default GetAllPasswordsService;
