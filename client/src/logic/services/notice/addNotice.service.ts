import React, { useState } from "react";
import { UseAppDispatch } from "../../redux/redux-hooks";
import { setAlert } from "../../redux/slices/alert.slice";
import { addNoticeRequest } from "../../requests/notice.request";
import { addNotice } from "../../redux/slices/notices.slice";

const AddNoticeService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const addNoticeEvent = async (object: { description: string }) => {
    return await addNoticeRequest(object)
      .then((res) => {
        dispatch(addNotice(res.data));
        dispatch(
          setAlert({ description: "Notice add with success", type: "SUCCESS" })
        );
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setAlert({ description: "Something goes wrong" }));
        setLoading(false);
      });
  };

  return { addNoticeEvent, loading, setLoading };
};

export default AddNoticeService;
