import React, { useState } from "react";
import "./health.css";
import "../../../index.css";
import PasswordTextInput from "../../../components/inputs/PasswordTextInput";

const Health = () => {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak");

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 6) {
      strength++;
    }
    if (password.length >= 10) {
      strength++;
    }
    if (/[A-Z]/.test(password)) {
      strength++;
    }
    if (/[0-9]/.test(password)) {
      strength++;
    }
    if (/[A-Za-z0-8]/.test(password)) {
      strength++;
    }
    setPasswordStrength(getStrengthLabel(strength));
  };

  const getStrengthLabel = (strength: number) => {
    if (strength <= 2) {
      return "weak";
    } else if (strength >= 2 && strength <= 4) {
      return "medium";
    } else {
      return "strong";
    }
  };

  return (
    <div id="page">
      <div
        className={`containerHe ${passwordStrength} ${
          password ? "password-entered" : ""
        }`}
      >
        <h1 className="titlePass">Password Strength Check</h1>

        <PasswordTextInput
          type={"password"}
          defaultLabel={"Password"}
          onChangeText={(text) => {
            setPassword(text);
            checkPasswordStrength(text);
          }}
          value={password}
          style={{ marginBottom: 20 }}
        />

        <div className="strengthMeter"></div>
        <div className="strengthText">
          {password && (
            <span className="passwordStrengthLabel">
              {passwordStrength === "weak"
                ? "Your password is Weak"
                : passwordStrength === "medium"
                ? "Your password is Medium"
                : "Your password is Strong"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Health;
