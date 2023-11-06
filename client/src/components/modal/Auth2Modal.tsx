import { useState } from "react";
import TextInput from "../inputs/TextInput";
import GenericModal from "./GenericModal";
import BasicButton from "../buttons/BasicButton";
import TwoFactorAuthService from "../../logic/services/twoFactorAuth.service";
import { UseAppDispatch } from "../../logic/redux/redux-hooks";
import { setAlert } from "../../logic/redux/slices/alert.slice";

type Auth2ModalType = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  data: {
    email: string;
    accessToken: string;
  };
};

const Auth2Modal = ({ setOpenModal, openModal, data }: Auth2ModalType) => {
  const dispatch = UseAppDispatch();
  const [token, setToken] = useState<string>("");

  const { send2FactorValidation, loading, setLoading } = TwoFactorAuthService();

  const handleValidation = async () => {
    if (token === "") {
      dispatch(setAlert({ description: "All fields are required" }));
      return;
    }

    setLoading(true);
    const validation = await send2FactorValidation({
      auth2token: token,
      acessToken: data.accessToken,
    });

    if (validation) {
      setOpenModal(false);
    } else {
      dispatch(setAlert({ description: "Invalid token" }));
    }
  };
  return (
    <GenericModal setOpenModal={setOpenModal} openModal={openModal}>
      <div
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
          minWidth: 500,
        }}
      >
        <h1 style={{ marginTop: 30, marginBottom: 0 }}>
          Two factor authentification
        </h1>
        <p style={{ width: 390, marginBottom: 50, marginTop: 5 }}>
          An email has been send to {data.email} with the two factor
          authentification token
        </p>

        <TextInput
          style={{
            backgroundColor: "#e0e0e0",
            width: "370px",
          }}
          type={"text"}
          defaultLabel={"Two factor token"}
          onChangeText={(text) => setToken(text)}
          value={undefined}
        />

        <BasicButton
          title={"Send"}
          onClick={async () => {
            await handleValidation();
          }}
          loading={loading}
        />
      </div>
    </GenericModal>
  );
};

export default Auth2Modal;
