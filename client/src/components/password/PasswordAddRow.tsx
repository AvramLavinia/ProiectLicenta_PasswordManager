import { useState } from "react";
import BasicButton from "../buttons/BasicButton";
import PasswordTextInput from "../inputs/PasswordTextInput";
import TextInput from "../inputs/TextInput";
import AddPasswordService from "../../logic/services/password/addPassword.service";
import { UseAppDispatch } from "../../logic/redux/redux-hooks";
import { setAlert } from "../../logic/redux/slices/alert.slice";

import { MdNoteAdd } from "react-icons/md";

const PasswordAddRow = () => {
  const dispatch = UseAppDispatch();
  const [platform, setPlatform] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const backgroundColor = "#f5f5f5";

  const { addPasswordEvent } = AddPasswordService();

  const handleAddPassword = async () => {
    await addPasswordEvent({ platform, email, password });
    setPlatform("");
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 10,
        margin: 5,
        alignItems: "center",
      }}
    >
      <TextInput
        style={{
          width: "200px",
          margin: 0,
          backgroundColor,
          marginLeft: 5,
          marginRight: 5,
        }}
        type={"text"}
        defaultLabel={"Platform"}
        onChangeText={(text) => {
          setPlatform(text);
        }}
        value={platform}
      />

      <TextInput
        style={{
          width: "200px",
          margin: 0,
          backgroundColor,
          marginLeft: 5,
          marginRight: 5,
        }}
        type={"email"}
        defaultLabel={"Email"}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />

      <PasswordTextInput
        style={{
          width: "250px",
          marginLeft: 5,
          marginRight: 5,
          backgroundColor,
          paddingRight: 5,
          margin: 0,
        }}
        inputStylePasword={{
          width: "200px",
          margin: 0,
          backgroundColor,
        }}
        type={"password"}
        defaultLabel={"Password"}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />

      <MdNoteAdd
        size={30}
        style={{ marginLeft: 10, width: 100 }}
        color="#00d4ff"
        onClick={async () => {
          if ([password, email, platform].some((value) => value === "")) {
            dispatch(setAlert({ description: "All fields are required" }));
            return;
          } else {
            await handleAddPassword();
            return;
          }
        }}
      />
    </div>
  );
};

export default PasswordAddRow;
