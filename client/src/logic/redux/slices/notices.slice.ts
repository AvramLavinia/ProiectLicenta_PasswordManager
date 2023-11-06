import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-hooks";

export type NoticeState = {
  id: string;
  description: string;
  createAt: string;
};

const initialState: NoticeState[] = [];

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotices: (state, action: PayloadAction<NoticeState[]>) => {
      return [...state, ...action.payload];
    },
    addNotice: (state, action: PayloadAction<NoticeState>) => {
      return [...state, action.payload];
    },
    deleteNotice: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((value) => value.id !== action.payload.id);
    },

    resetNotice: () => {
      return initialState;
    },
  },
});

export const { setNotices, addNotice, deleteNotice, resetNotice } =
  noticeSlice.actions;
export const selectNoticeValue = (state: RootState) => state.notice;

export default noticeSlice.reducer;
