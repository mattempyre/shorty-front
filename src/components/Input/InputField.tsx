// components/InputField.tsx
import React from 'react';
import { Input } from '@material-tailwind/react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import { colors } from '@material-tailwind/react/types/generic';

type Size = 'md' | 'lg';
type Color = 'black' | 'white' | colors; // Add or adjust sizes based on the library's documentation or your requirements.

interface FormValues {
  longUrl: string;
  customShortUrl: string;
}

interface InputProps {
  label: string;
  id: keyof FormValues;
  type: string;
  register: UseFormRegister<FormValues>; // Use the react-hook-form type
  validation?: RegisterOptions; // Use the react-hook-form type
  size: Size;
  color: Color;
  error?: boolean;
  crossOrigin?: boolean;
}

const InputField: React.FC<InputProps> = ({ ...props }) => {
  return (
    <Input
      label={props.label}
      id={props.id}
      type={props.type}
      {...props.register(props.id, props.validation)}
      size={props.size}
      color={props.color}
      error={props.error}
      crossOrigin={props.crossOrigin}
    />
  );
};

export default InputField;
