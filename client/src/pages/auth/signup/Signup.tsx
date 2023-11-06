import React, { useState } from "react";
import "./signup-style.css";
import "../../../index.css";
import TextInput from "../../../components/inputs/TextInput";
import PasswordTextInput from "../../../components/inputs/PasswordTextInput";
import RegisterService from "../../../logic/services/register.service";
import { UseAppDispatch } from "../../../logic/redux/redux-hooks";
import { setAlert } from "../../../logic/redux/slices/alert.slice";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../../components/buttons/BasicButton";
import Auth2Modal from "../../../components/modal/Auth2Modal";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = UseAppDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rewritePassword, setRewritePassword] = useState<string>("");

  const { register, loading, setLoading } = RegisterService();

  const handleRegister = async () => {
    const verifyInputs = [name, email, password, rewritePassword].filter(
      (value) => value === ""
    );
    if (verifyInputs.length !== 0) {
      dispatch(setAlert({ description: "All fields must be required" }));
      return;
    }
    if (password !== rewritePassword) {
      dispatch(setAlert({ description: "Passwords not match" }));
      return;
    }

    setLoading(true);

    const validation = await register({ name, email, password });

    if (typeof validation === "string") {
      setEmail("");
      setPassword("");
      setRewritePassword("");
      setName("");
    }

    setLoading(false);
  };

  return (
    <div id="page">
      <div className="sub-main2">
        <div>
          <div>
            <h1>Sign-Up Page</h1>
            <p>Let us know you</p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextInput
                type={"text"}
                defaultLabel={"Name"}
                onChangeText={(text) => {
                  setName(text);
                }}
                value={name}
              />
              <TextInput
                type={"email"}
                defaultLabel={"Email"}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                value={email}
              />
              <PasswordTextInput
                type={"password"}
                defaultLabel={"Password"}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                value={password}
              />
              <PasswordTextInput
                type={"password"}
                defaultLabel={"Rewrite Password"}
                onChangeText={(text) => {
                  setRewritePassword(text);
                }}
                value={rewritePassword}
              />
            </div>

            <BasicButton
              title={"Register"}
              onClick={() => {
                handleRegister();
              }}
              loading={loading}
            />

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "normal" }}>
                Have an account?{" "}
              </p>
              <p
                style={{
                  margin: 0,
                  paddingLeft: "5px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
