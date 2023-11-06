import { PasswordState } from "../redux/slices/password.slice";
import { AddPasswordState } from "../services/password/addPassword.service";
import axios from "./default.request";

export const getAllPasswordRequest = async () => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.get<PasswordState[]>("/password/getAll", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const addPasswordRequest = async (object: AddPasswordState) => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.post<PasswordState>("/password/save", object, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const updatePasswordRequest = async (object: PasswordState) => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.post<PasswordState>("/password/update", object, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deletePasswordRequest = async (id: string) => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.post<PasswordState>(
    "/password/delete",
    { id },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};
