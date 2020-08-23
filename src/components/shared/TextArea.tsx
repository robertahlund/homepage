import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import "./TextArea.scss";

interface TextAreaProps {
  value: string;
  placeholder?: string;
  handleOnChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({
  value,
  handleOnChange,
  handleKeyPress,
  placeholder,
}) => {
  return (
    <textarea
      className="textarea"
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default TextArea;
