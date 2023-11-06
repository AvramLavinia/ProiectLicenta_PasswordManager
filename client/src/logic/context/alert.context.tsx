import React, { createContext, useEffect, useState } from "react";
import { resetAlert, selectAlertValue } from "../redux/slices/alert.slice";
import { UseAppDispatch, UseAppSelector } from "../redux/redux-hooks";
import { Alert, Fade } from "@mui/material";

export const AlertContext = createContext(undefined);

const AlertProvider = (props: any) => {
  const dispatch = UseAppDispatch();
  const alert = UseAppSelector(selectAlertValue);

  useEffect(() => {
    if (alert.description !== null) {
      setTimeout(() => {
        dispatch(resetAlert());
      }, 3000);
    }
  }, [alert.description]);

  return (
    <AlertContext.Provider value={undefined}>
      <>
        {props.children}
        {alert.description !== null && (
          <Alert
            severity={alert.type === "ERROR" ? "error" : "success"}
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              right: 0,
              bottom: 0,
              margin: "25px",
              padding: "5px",
              paddingX: "10px",
              fontWeight: "700",
              fontSize: "20px",
              zIndex: 1000000,
            }}
          >
            {alert.description}
          </Alert>
        )}
      </>
    </AlertContext.Provider>
  );
};

export default AlertProvider;
