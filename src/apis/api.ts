import axios, { AxiosResponse } from 'axios';
import { FormValues } from '@/types/types'; // Adjust the path as needed

export const createShortUrl = async (
  data: FormValues
): Promise<AxiosResponse> => {
  const response = await axios.post(
    'http://localhost:9000/api/url/create',
    data
  );
  return response;
};
