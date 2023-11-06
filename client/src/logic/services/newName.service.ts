import { useState } from "react";
import { UseAppDispatch } from "../redux/redux-hooks";
import {
  NameResponse,
  UpdateProfileDto,
} from "../requests/auth.requests.types";
import { updateProfileRequest } from "../requests/user.requests";
import { setAlert } from "../redux/slices/alert.slice";
import { updateUser } from "../redux/slices/user.slice";

const NewNameService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const updateProfile = async (object: UpdateProfileDto) => {
    setLoading(true);
    return await updateProfileRequest(object)
      .then(async (res) => {
        const data: NameResponse = res.data;
        if (!res) {
          console.error("SOMETHING GOES WRONG!");
          setLoading(false);
          return false;
        } else {
          setLoading(false);
          return dispatch(updateUser(data));
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setAlert({ description: error.response.data.message }));
        return false;
      });
  };
  return { updateProfile, loading, setLoading };
};
export default NewNameService;
