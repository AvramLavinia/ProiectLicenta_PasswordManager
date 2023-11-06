import React, { useState } from "react";
import { UseAppDispatch } from "../redux/redux-hooks";
import { setAlert } from "../redux/slices/alert.slice";
import { auth2ValidationRequest } from "../requests/auth.requests";
import { authResponse } from "../requests/auth.requests.types";
import { loggedIn } from "../redux/slices/auth.slice";
import { setUser } from "../redux/slices/user.slice";
import { useNavigate as UseNavigate } from "react-router-dom";

const TwoFactorAuthService = () => {
  const navigate = UseNavigate();
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const send2FactorValidation = async (object: {
    auth2token: string;
    acessToken: string;
  }) => {
    return await auth2ValidationRequest(object.auth2token, object.acessToken)
      .then(async (res) => {
        const data: authResponse = res.data;
        if (!res) {
          console.error("SOMETHING GOES WRONG!");
          setLoading(false);
          return false;
        } else {
          localStorage.setItem("accessToken", data.accessToken);

          dispatch(
            loggedIn({
              isLogged: true,
              accessToken: data.accessToken,
              isLoading: false,
            })
          );
          dispatch(
            setUser({ id: data.id, email: data.email, name: data.name })
          );
          setLoading(false);

          navigate("/");
          return true;
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setAlert({ description: error.response.data.message }));
        return false;
      });
  };

  return { send2FactorValidation, loading, setLoading };
};

export default TwoFactorAuthService;
