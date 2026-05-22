import React from 'react';

interface ButtonedInputProps {
  buttonText: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const ButtonedInput: React.FC<ButtonedInputProps> = ({
  buttonText,
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = 'Type a message',
}) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex">
      <input
        className="flex-1 mr-2 p-2"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSubmit} disabled={disabled}>
        {buttonText}
      </button>
    </div>
  );
};

export default ButtonedInput;
