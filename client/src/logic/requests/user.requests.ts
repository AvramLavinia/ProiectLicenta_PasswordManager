import { UpdateProfileDto, NameResponse } from "./auth.requests.types";
import axios from "./default.request";

export const updateProfileRequest = async (object: UpdateProfileDto) => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.post<NameResponse>("/user/update", object, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
