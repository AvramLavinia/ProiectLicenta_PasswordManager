import { LoginDto, RegisterDto, authResponse } from "./auth.requests.types";
import axios from "./default.request";

export const registerRequest = async (object: RegisterDto) => {
  return await axios.post<authResponse>("/auth/register", object);
};

export const loginRequest = async (object: LoginDto) => {
  return await axios.post<authResponse>("/auth/login", object);
};

export const sendForgotPasswordEmailRequest = async (email: string) => {
  return await axios.post<string>("/auth/sendForgotPasswordEmail", {
    email: email,
  });
};

export const refreshRequest = async (accessToken: string) => {
  return await axios.post<authResponse>("/auth/refresh", null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const forgotPasswordRequest = async (
  password: string,
  accessToken: string
) => {
  return await axios.post<string>(
    `/auth/forgotPassword`,
    { password },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const auth2ValidationRequest = async (
  auth2token: string,
  accessToken: string
) => {
  return await axios.post<authResponse>(
    `/auth/auth2`,
    { auth2token },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};
