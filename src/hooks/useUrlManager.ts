// hooks/useUrlManager.ts

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { handleAxiosError } from '../utilities/errorHandling';
import { addUrl } from '../store/urlsSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { FormValues, ErrorResponse } from '@/types/types';
import { createShortUrl } from '@/apis/api';

const useUrlManager = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const submitUrl = async (data: FormValues) => {
    try {
      const response = await createShortUrl(data);
      dispatch(addUrl(response.data));
      setError(null);
      toast.success('Short URL created successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setError(handleAxiosError(axiosError));
        toast.error('An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return {
    submitUrl,
    error,
    setError,
  };
};

export default useUrlManager;
