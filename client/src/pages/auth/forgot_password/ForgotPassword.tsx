import React, { useState } from "react";
import "./forgot-style.css";
import "../../../index.css";
import BasicButton from "../../../components/buttons/BasicButton";
import TextInput from "../../../components/inputs/TextInput";
import forgotPasswordService from "../../../logic/services/forgotPassword.service";
import { UseAppDispatch } from "../../../logic/redux/redux-hooks";
import { setAlert } from "../../../logic/redux/slices/alert.slice";

const ForgotPassword = () => {
  const dispatch = UseAppDispatch();
  const [email, setEmail] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { sendForgotPasswordEmail } = forgotPasswordService();

  const handleSendEmail = async () => {
    if (email === "") {
      dispatch(setAlert({ description: "All fields are required" }));
      return;
    }

    setLoading(true);
    await sendForgotPasswordEmail(email);
    setEmail("");
    setLoading(false);
  };

  return (
    <div id="page">
      <div className="sub-main3">
        <h1>Forgot Password</h1>

        <p style={{ alignSelf: "flex-start", paddingBottom: 10 }}>
          Don't panic , we will send you an email with the details to change the
          password.
        </p>

        <TextInput
          type={"email"}
          defaultLabel={"Email"}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <BasicButton
          title={"Send email"}
          onClick={async () => await handleSendEmail()}
          loading={loading}
        />
      </div>
    </div>
  );
};
export default ForgotPassword;
