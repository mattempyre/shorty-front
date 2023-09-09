import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormValues {
  longUrl: string;
  customShortUrl: string;
}

const UrlForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Make a POST request to your backend API
      const response = await axios.post(
        'http://localhost:9000/api/url/create',
        data
      );

      // Handle the response (you can update this part based on your needs)
      console.log('Response from server:', response.data);

      // Reset the form after successful submission
      reset();
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="longUrl"
            className="block text-gray-600 font-semibold"
          >
            Long URL
          </label>
          <input
            type="text"
            id="longUrl"
            {...register('longUrl', { required: 'Long URL is required' })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
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
          <input
            type="text"
            id="customShortUrl"
            {...register('customShortUrl')}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Create Short URL
        </button>
      </form>
    </div>
  );
};

export default UrlForm;
