import { useState } from "react";
import { PasswordState } from "../../logic/redux/slices/password.slice";
import BasicButton from "../buttons/BasicButton";
import PasswordTextInput from "../inputs/PasswordTextInput";
import TextInput from "../inputs/TextInput";

import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import DeletePasswordService from "../../logic/services/password/delete.Password.service";
import UpdatePasswordService from "../../logic/services/password/updatePassword.service";

const PasswordRow = (data: PasswordState) => {
  const [disable, setDisable] = useState<boolean>(true);
  const [operation, setOperation] = useState<"EDIT" | "DELETE">();
  const backgroundColor = disable ? "#f5f5f5" : "#e0e0e0";

  const [platform, setPlatform] = useState<string>(data.platform);
  const [email, setEmail] = useState<string>(data.email);
  const [password, setPassword] = useState<string>(data.password);

  const { deletePasswordEvent } = DeletePasswordService();
  const { updatePasswordEvent } = UpdatePasswordService();

  const handleDelete = async () => {
    await deletePasswordEvent(data);
  };

  const handleEdit = async () => {
    await updatePasswordEvent({ platform, email, password, id: data.id });
    setDisable(true);
  };

  const handleEvent = async () => {
    if (operation === "EDIT") {
      await handleEdit();
    } else {
      await handleDelete();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5,
        borderRadius: 10,
      }}
    >
      <TextInput
        style={{
          width: "200px",
          margin: 0,
          backgroundColor: backgroundColor,
          marginLeft: 5,
          marginRight: 5,
        }}
        type={"text"}
        defaultLabel={"Platform"}
        onChangeText={(text) => {
          setPlatform(text);
        }}
        value={platform}
        disable={disable}
      />

      <TextInput
        style={{
          width: "200px",
          margin: 0,
          backgroundColor: backgroundColor,
          marginLeft: 5,
          marginRight: 5,
        }}
        type={"email"}
        defaultLabel={"Email"}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
        disable={disable}
      />

      <PasswordTextInput
        style={{
          width: "250px",
          marginLeft: 5,
          marginRight: 5,
          backgroundColor: backgroundColor,
          paddingRight: 5,
          margin: 0,
        }}
        inputStylePasword={{
          width: "200px",
          margin: 0,
          backgroundColor: backgroundColor,
        }}
        type={"password"}
        defaultLabel={"Password"}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        disable={disable}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 10,
          width: 100,
        }}
      >
        {disable ? (
          <>
            <FaEdit
              size={30}
              style={{ marginLeft: 10 }}
              color="orange"
              onClick={async () => {
                setDisable(false);
                setOperation("EDIT");
              }}
            />
            <MdRemoveCircle
              size={30}
              style={{ marginLeft: 10 }}
              color="red"
              onClick={async () => {
                setDisable(false);
                setOperation("DELETE");
              }}
            />
          </>
        ) : (
          <>
            <FaSave
              size={30}
              style={{ marginLeft: 10 }}
              color="#00d4ff"
              onClick={async () => {
                await handleEvent();
              }}
            />
            <FaUndoAlt
              size={30}
              style={{ marginLeft: 10 }}
              color="gray"
              onClick={async () => {
                setDisable(true);
                setOperation(undefined);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordRow;
