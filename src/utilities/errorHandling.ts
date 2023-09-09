import { AxiosError } from 'axios';

// Define an interface for error responses from your API
interface ErrorResponse {
  error: string;
}

// Function to handle Axios errors and extract error messages
export function handleAxiosError(error: AxiosError<ErrorResponse>): string {
  if (error.response && error.response.data) {
    return error.response.data.error;
  } else {
    return 'An error occurred. Please try again later.';
  }
}
