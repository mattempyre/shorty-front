// components/InputField.tsx
import React from 'react';
import { Input } from '@material-tailwind/react'; // Import the Input component from the Material Tailwind library
import { UseFormRegister, RegisterOptions } from 'react-hook-form'; // Import types for registering form inputs from react-hook-form
import { colors } from '@material-tailwind/react/types/generic'; // Import color types from Material Tailwind

// Define custom types for size and color options
type Size = 'md' | 'lg'; // Size options: 'md' (medium) or 'lg' (large)
type Color = 'black' | 'white' | colors; // Color options: 'black', 'white', or any valid color from Material Tailwind

// Define an interface for the form values that this input field can handle
interface FormValues {
  longUrl: string; // Represents a long URL input field
  customShortUrl: string; // Represents a custom short URL input field
}

// Define the props that can be passed to the InputField component
interface InputProps {
  label: string; // Label text for the input field
  id: keyof FormValues; // The "id" property corresponds to the keys in the FormValues interface
  type: string; // The input field type (e.g., 'text', 'password', etc.)
  register: UseFormRegister<FormValues>; // Function provided by react-hook-form for registering the input
  validation?: RegisterOptions; // Validation options for the input (optional)
  size: Size; // Size of the input ('md' or 'lg')
  color: Color; // Color of the input ('black', 'white', or a valid Material Tailwind color)
  error?: boolean; // Flag to indicate if there's an error with the input (optional)
  crossOrigin?: boolean; // Flag to specify whether the input supports cross-origin requests (optional)
}

// Define the InputField component as a React functional component
const InputField: React.FC<InputProps> = ({ ...props }) => {
  return (
    // Render the Input component from Material Tailwind with the provided props
    <Input
      label={props.label} // Set the label text for the input
      id={props.id} // Set the "id" property based on the props
      type={props.type} // Set the input field type based on the props
      {...props.register(props.id, props.validation)} // Register the input field with react-hook-form
      size={props.size} // Set the size of the input based on the props
      color={props.color} // Set the color of the input based on the props
      error={props.error} // Set the error flag for the input based on the props
      crossOrigin={props.crossOrigin} // Set the cross-origin flag based on the props
    />
  );
};

export default InputField; // Export the InputField component as the default export
