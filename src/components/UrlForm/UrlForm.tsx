import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { FormValues } from '@/types/types';
import isValidURL from '@/utilities/isValidUrl';
import InputField from '../Input/InputField'; // Importing a custom InputField component
import useUrlManager from '@/hooks/useUrlManager'; // Importing a custom hook for URL management
import { toast } from 'sonner'; // Importing a toast notification library

// Define a functional component named UrlForm
const UrlForm: React.FC = () => {
  // Destructure methods and state from the useForm hook
  const {
    register, // A function to register input elements
    handleSubmit, // A function to handle form submission
    formState: { errors, isDirty }, // Form state including errors and dirty status
    reset, // A function to reset the form
  } = useForm<FormValues>(); // useForm hook from react-hook-form for form handling

  // Destructure methods from the custom useUrlManager hook for URL management
  const { submitUrl, error } = useUrlManager();

  // Define a function to handle form submission
  const onSubmit = async (data: FormValues) => {
    // Call the submitUrl function from the useUrlManager hook to submit URL data
    await submitUrl(data);
    // Reset the form after submission
    reset();
  };

  // Use useEffect to display an error toast if there is an error from URL submission
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Render the URL shortening form
  return (
    <div className="max-w-screen mx-auto">
      <div
        className="bg-gradient-to-tr
          from-blue-400 
          to-cyan-500 
          via-teal-500 animate-gradient-x min-h-screen min-w-screen flex justify-center items-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Shorten Your URL
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              {/* Render an InputField component for entering a long URL */}
              <InputField
                label="Enter a long URL"
                id="longUrl"
                type="text"
                register={register}
                validation={{
                  required: 'Long URL is required',
                  validate: (value: string) =>
                    isValidURL(value) || 'Invalid URL format',
                }}
                size="md"
                color="blue"
                error={!!errors.longUrl}
                crossOrigin={false}
              />
              {errors.longUrl && (
                <p className="text-red-500 text-sm">{errors.longUrl.message}</p>
              )}
            </div>
            <div>
              {/* Render an InputField component for entering a custom short URL (optional) */}
              <InputField
                label="Custom back-half of the short URL (optional)"
                id="customShortUrl"
                type="text"
                register={register}
                size="md"
                color="green"
                crossOrigin={false}
              />
            </div>
            {/* Render a submit button */}
            <Button
              type="submit"
              fullWidth
              ripple
              color="green"
              disabled={!isDirty} // Disable the button when the form is not dirty
            >
              Create Short URL
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UrlForm;
