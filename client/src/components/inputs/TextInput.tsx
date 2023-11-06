import { TextInputProps } from "./TextInput.type";

const TextInput = (props: TextInputProps) => {
  const {
    type,
    defaultLabel,
    onChangeText,
    value,
    validate,
    disable = false,
    style,
  } = props;

  return (
    <input
      style={{ ...styleText, ...style }}
      type={type}
      placeholder={defaultLabel}
      onChange={(e: any) => onChangeText(e.target.value)}
      value={value}
      disabled={disable}
    />
  );
};

const styleText: React.CSSProperties = {
  width: "98%",
  height: 60,
  borderRadius: 10,
  paddingLeft: "10px",
  justifyContent: "center",
  marginBottom: 10,
  color: "black",
  fontSize: 20,
  border: "none",
};

export default TextInput;
