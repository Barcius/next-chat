import React, { useRef } from 'react';

interface ButtonedInputProps {
  buttonText: string;
  onButtonClick: (val: string) => void;
  defaultInputValue?: string;
  disabled?: boolean;
}

const ButtonedInput: React.FC<ButtonedInputProps> = ({
  buttonText,
  onButtonClick,
  defaultInputValue,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef?.current) {
      const val = inputRef.current.value.trim();
      if (val) onButtonClick(val);
      inputRef.current.value = '';
    }
  };
  return (
    <div className="flex">
      <input
        className="flex-1 mr-2 p-2"
        type="text"
        ref={inputRef}
        placeholder="Type a message"
        defaultValue={defaultInputValue}
      />
      <button onClick={handleButtonClick} disabled={disabled}>
        {buttonText}
      </button>
    </div>
  );
};

export default ButtonedInput;
