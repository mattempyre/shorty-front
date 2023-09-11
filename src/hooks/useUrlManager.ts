// hooks/useUrlManager.ts

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { handleAxiosError } from '../utilities/errorHandling';
import { addUrl } from '../store/urlsSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { FormValues, ErrorResponse } from '@/types/types';
import { createShortUrl } from '@/apis/api';

// Custom hook for managing URL-related operations
const useUrlManager = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  // Function to submit a new URL and handle the response or errors
  const submitUrl = async (data: FormValues) => {
    try {
      // Send a request to create a short URL
      const response = await createShortUrl(data);

      // Dispatch an action to add the new URL to the Redux store
      dispatch(addUrl(response.data));

      // Clear any previous error messages
      setError(null);

      // Display a success toast notification
      toast.success('Short URL created successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors, such as network issues or server errors
        const axiosError = error as AxiosError<ErrorResponse>;

        // Set the error message based on the Axios error response
        setError(handleAxiosError(axiosError));

        // Display an error toast notification
        toast.error('An error occurred. Please try again later.');
      } else {
        // Handle non-Axios errors, such as unexpected issues
        setError('An error occurred. Please try again later.');

        // Display an error toast notification
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  // Return the functions and error state for external use
  return {
    submitUrl,
    error,
    setError,
  };
};

export default useUrlManager;
