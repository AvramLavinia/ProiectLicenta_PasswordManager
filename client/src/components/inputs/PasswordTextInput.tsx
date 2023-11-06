import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { TextInputProps } from "./TextInput.type";

const PasswordTextInput = (props: TextInputProps) => {
  const {
    type,
    defaultLabel,
    onChangeText,
    value,
    validate,
    style,
    disable = false,
    inputStylePasword,
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div style={{ ...styleTextInput, ...style }}>
      <input
        style={{
          fontSize: 20,
          borderRadius: "10px",
          paddingLeft: 10,
          border: "none",
          ...inputStylePasword,
        }}
        type={showPassword ? "text" : "password"}
        placeholder={defaultLabel}
        onChange={(e: any) => onChangeText(e.target.value)}
        value={value}
        disabled={disable}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "20%",
          justifyContent: "center",
          fontSize: 25,
        }}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  );
};

const styleTextInput: React.CSSProperties = {
  width: "100%",
  height: 60,
  borderRadius: 10,
  padding: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
  backgroundColor: "white",
  color: "black",
};

export default PasswordTextInput;
