// Import necessary dependencies and types
import axios, { AxiosResponse } from 'axios';
import { FormValues } from '@/types/types'; // Adjust the path as needed

// Define an asynchronous function named createShortUrl
export const createShortUrl = async (
  data: FormValues
): Promise<AxiosResponse> => {
  // Send a POST request to the specified URL with the provided data
  const response = await axios.post(
    'http://localhost:9000/api/url/create', // The URL to send the POST request to
    data // The data to include in the request body
  );

  // Return the AxiosResponse object representing the response from the server
  return response;
};
