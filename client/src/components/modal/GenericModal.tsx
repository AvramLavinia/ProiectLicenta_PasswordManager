import { Modal } from "@mui/material";
import React from "react";

type GenericModalType = {
  children: JSX.Element;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
};

const GenericModal = ({
  children,
  setOpenModal,
  openModal = false,
}: GenericModalType) => {
  return (
    <Modal
      style={modalStyle}
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      {children}
    </Modal>
  );
};

const modalStyle: React.CSSProperties = {
  position: "absolute",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default GenericModal;
