import React from "react";
import { UseAppDispatch } from "./../redux/redux-hooks";
import { useState } from "react";

import { loginRequest } from "../requests/auth.requests";
import { LoginDto, authResponse } from "../requests/auth.requests.types";

import { setAlert } from "../redux/slices/alert.slice";

const LoginService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (object: LoginDto) => {
    return await loginRequest(object)
      .then(async (res) => {
        const data: authResponse = res.data;
        if (!res) {
          console.error("SOMETHING GOES WRONG!");
          setLoading(false);
          return false;
        } else {
          setLoading(false);
          return data.accessToken;
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setAlert({ description: error.response.data.message }));
        return false;
      });
  };

  return { login, loading, setLoading };
};

export default LoginService;
