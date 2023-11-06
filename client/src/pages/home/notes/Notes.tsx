import React, { useState } from "react";
import "./notes.css";
import "../../../index.css";
import NotesList from "../../../components/notes/NotesList";
import { nanoid } from "@reduxjs/toolkit";
import { UseAppSelector } from "../../../logic/redux/redux-hooks";
import { selectNoticeValue } from "../../../logic/redux/slices/notices.slice";
import AddNoticeService from "../../../logic/services/notice/addNotice.service";
import DeleteNoticeService from "../../../logic/services/notice/deleteNotice.service";

const Notes = () => {
  const notices = UseAppSelector(selectNoticeValue);

  const { addNoticeEvent, loading } = AddNoticeService();
  const { deleteNoticeEvent } = DeleteNoticeService();

  const addNote = async (text: string) => {
    await addNoticeEvent({ description: text });
    text = "";
  };

  const deleteNote = (id: string) => {
    deleteNoticeEvent({ id });
  };
  return (
    <div id="page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div style={{ marginLeft: "40px", marginTop: "40px" }}>
          <h1>NOTICES</h1>
          <p> Place your favourite notices here </p>
        </div>
        <NotesList
          notes={notices}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};
export default Notes;
