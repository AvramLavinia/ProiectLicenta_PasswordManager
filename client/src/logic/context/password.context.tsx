import React, { createContext, useEffect, useState } from "react";
import GetAllPasswordsService from "../services/password/getPasswords.service";
import { UseAppSelector } from "../redux/redux-hooks";
import { selectAuthValue } from "../redux/slices/auth.slice";
import GetAllNoticesService from "../services/notice/getAllNotices.service";

export const DataContext = createContext(undefined);

const DataProvider = (props: any) => {
  const isLogged = UseAppSelector(selectAuthValue).isLogged;
  const { getAllPasswordsEvent } = GetAllPasswordsService();
  const { getAllNoticesEvent } = GetAllNoticesService();

  useEffect(() => {
    const methode = async () => {
      await getAllPasswordsEvent();
      await getAllNoticesEvent();
    };

    if (isLogged) {
      methode();
    }
  }, [isLogged]);

  return (
    <DataContext.Provider value={undefined}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
