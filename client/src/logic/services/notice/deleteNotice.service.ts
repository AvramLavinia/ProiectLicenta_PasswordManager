import React, { useState } from "react";
import { UseAppDispatch } from "../../redux/redux-hooks";
import { setAlert } from "../../redux/slices/alert.slice";
import { NoticeState, deleteNotice } from "../../redux/slices/notices.slice";
import { deleteNoticeRequest } from "../../requests/notice.request";

const DeleteNoticeService = () => {
  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteNoticeEvent = async (object: { id: string }) => {
    setLoading(true);
    return await deleteNoticeRequest(object.id)
      .then((res) => {
        dispatch(deleteNotice({ id: res.data.id }));
        dispatch(
          setAlert({
            description: "Notice delete with success",
            type: "SUCCESS",
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        dispatch(setAlert({ description: "Something goes wrong" }));
        setLoading(false);
      });
  };

  return { deleteNoticeEvent, loading };
};

export default DeleteNoticeService;
