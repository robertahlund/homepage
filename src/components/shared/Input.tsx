import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import "./Input.scss";

interface InputProps {
  value: string;
  placeholder?: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  name?: string;
}

const Input: FC<InputProps> = ({
  value,
  handleOnChange,
  handleKeyPress,
  placeholder,
  name,
}) => {
  return (
    <input
      className="input"
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default Input;
