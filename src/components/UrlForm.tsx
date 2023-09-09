import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { Button, Input } from '@material-tailwind/react';
import { handleAxiosError } from '../utilities/errorHandling';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addUrl } from '../store/urlsSlice'; // Import your Redux action

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
  } = useForm<FormValues>();

  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/url/create',
        data
      );

      //   console.log('Response from server:', response.data);

      // Dispatch the addUrl action to update the Redux store
      dispatch(addUrl(response.data)); // Dispatch the action

      //   console.log('Dispatched action to Redux:', response.data);

      reset();
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setError(handleAxiosError(axiosError));
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {error}
          </div>
        )}
        <div>
          <Input
            label="Enter a long URL"
            id="longUrl"
            type="text"
            {...register('longUrl', {
              required: 'Long URL is required',
              pattern: {
                value: /^(https?:\/\/)?(www\.)?[^.\s]+\.[a-zA-Z]{2,}(\S*)?$/,
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
          <label
            htmlFor="customShortUrl"
            className="block text-gray-600 font-semibold"
          >
            Custom Short URL (optional)
          </label>
          <Input
            id="customShortUrl"
            type="text"
            {...register('customShortUrl')}
            size="md"
            color="blue"
            crossOrigin={false}
          />
        </div>
        <Button type="submit" color="blue" disabled={!isDirty}>
          Create Short URL
        </Button>
      </form>
    </div>
  );
};

export default UrlForm;
