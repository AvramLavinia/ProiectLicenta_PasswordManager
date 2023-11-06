import { createContext, useEffect, useState } from "react";
import { UseAppSelector } from "../redux/redux-hooks";
import { selectAuthValue } from "../redux/slices/auth.slice";
import logoutService from "../services/logout.service";
import React from "react";
import refreshService from "../services/refresh.service";

type AuthInterface = {
  isLoading: boolean;
};

export const AuthContext = createContext<AuthInterface>({ isLoading: true });

const AuthProvider = (props: any) => {
  const isLoading = UseAppSelector(selectAuthValue).isLoading;
  const [state, setState] = useState<AuthInterface>({ isLoading });

  const { logout } = logoutService();
  const { refreshRequestService } = refreshService();

  useEffect(() => {
    const methode = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken !== null) {
        await refreshRequestService(accessToken);
      } else {
        logout();
      }

      setState({ isLoading: false });
    };

    methode();
  }, []);

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
