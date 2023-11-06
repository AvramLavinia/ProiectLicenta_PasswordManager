import { UseAppDispatch } from "./../redux/redux-hooks";

import { setAlert } from "../redux/slices/alert.slice";
import { registerRequest } from "../requests/auth.requests";
import { RegisterDto } from "../requests/auth.requests.types";
import { useState } from "react";

const RegisterService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (object: RegisterDto) => {
    return await registerRequest(object)
      .then(async (res) => {
        if (!res) {
          setLoading(false);
          console.error("SOMETHING GOES WRONG!");
          return false;
        } else {
          setLoading(false);
          dispatch(
            setAlert({
              description:
                "Account has been created.\n You can now login to app",
              type: "SUCCESS",
            })
          );
          return res.data.accessToken;
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setAlert({ description: error.response.data.message }));
        return false;
      });
  };

  return { register, loading, setLoading };
};

export default RegisterService;
