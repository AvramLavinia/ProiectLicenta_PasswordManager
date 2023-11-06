import { NoticeState } from "./../redux/slices/notices.slice";
import axios from "./default.request";

export const getAllNoticesRequest = async () => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.get<NoticeState[]>("/notice/getAll", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const addNoticeRequest = async (object: { description: string }) => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.post<NoticeState>("/notice/save", object, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deleteNoticeRequest = async (id: string) => {
  const accessToken = localStorage.getItem("accessToken");
  return await axios.post<NoticeState>(
    "/notice/delete",
    { id },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};
