import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { Button, Input } from '@material-tailwind/react';
import { handleAxiosError } from '../utilities/errorHandling';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addUrl } from '../store/urlsSlice'; // Import your Redux action
import { toast } from 'sonner';
import { useEffect } from 'react';

interface FormValues {
  longUrl: string;
  customShortUrl: string;
}

interface ErrorResponse {
  error: string;
}

const UrlForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormValues>(); // Access the toast function

  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/url/create',
        data
      );

      // Dispatch the addUrl action to update the Redux store
      dispatch(addUrl(response.data)); // Dispatch the action

      reset();
      setError(null);

      // Show a success toast
      toast.success('Short URL created successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setError(handleAxiosError(axiosError));

        // Show an error toast
        toast.error('An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');

        // Show an error toast
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      // Show an error toast when the error state is set
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="max-w-md mx-auto mt-5">
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Shorten Your URL
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Enter a long URL"
                id="longUrl"
                type="text"
                {...register('longUrl', {
                  required: 'Long URL is required',
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?[^.\s]+\.[a-zA-Z]{2,}(\S*)?$/,
                    message: 'Invalid URL format',
                  },
                })}
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
              <Input
                label="Custom back-half of the short URL (optional)"
                id="customShortUrl"
                type="text"
                {...register('customShortUrl')}
                size="md"
                color="green"
                crossOrigin={false}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              ripple
              color="blue"
              disabled={!isDirty}
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
