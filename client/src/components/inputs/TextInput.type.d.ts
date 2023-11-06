import React from "react";

export const OTypeShowPassword = {
  SHOW: "SHOW",
  HIDE: "HIDE",
} as const;

export type typeShowPassword =
  (typeof OTypeShowPassword)[keyof typeof OTypeShowPassword];

export type TextInputProps = {
  type: React.HTMLInputTypeAttribute | undefined;
  defaultLabel: string;
  onChangeText: (text: string) => void;
  value: string | number | undefined;
  secureTextEntry?: boolean;
  multiline?: boolean;
  validate?: boolean;
  onPress?: Function;
  disable?: boolean;
  style?: React.CSSProperties;
  inputStylePasword?: React.CSSProperties;
  icon?: React.ReactElement;
};
