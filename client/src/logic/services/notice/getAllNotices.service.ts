import React, { useState } from "react";
import { UseAppDispatch } from "../../redux/redux-hooks";
import { setAlert } from "../../redux/slices/alert.slice";
import { setNotices } from "../../redux/slices/notices.slice";
import { getAllNoticesRequest } from "../../requests/notice.request";

const GetAllNoticesService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllNoticesEvent = async () => {
    setLoading(true);
    return await getAllNoticesRequest()
      .then((res) => {
        dispatch(setNotices(res.data));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setAlert({ description: "Something goes wrong" }));
        setLoading(false);
      });
  };

  return { getAllNoticesEvent, loading };
};

export default GetAllNoticesService;
