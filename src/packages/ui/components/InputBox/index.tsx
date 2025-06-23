"use client";
import React, { ChangeEvent, useEffect } from "react";
import { DefaultInput, InputTitle } from "./styles";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  initialValue?: string;
  inputTitle?: string;
  size?: "large" | "regular" | "small" | "login";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputProps> = ({
  inputTitle,
  type,
  placeholder,
  value,
  size = "large",
  onChange,
  initialValue,
}) => {
  return (
    <div>
      <InputTitle size={size}>{inputTitle}</InputTitle>
      <DefaultInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={initialValue}
        size={size}
      />
    </div>
  );
};

export default InputBox;
