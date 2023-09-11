import { AxiosError } from 'axios';

// Define an interface for error responses from your API
interface ErrorResponse {
  error: string; // The shape of an error response, which typically contains an 'error' property
}

// Function to handle Axios errors and extract error messages
export function handleAxiosError(error: AxiosError<ErrorResponse>): string {
  // Check if the error object has a response and data properties (indicating a server response)
  if (error.response && error.response.data) {
    // If the error response contains data, return the 'error' property from it
    return error.response.data.error;
  } else {
    // If there is no response or data, return a generic error message
    return 'An error occurred. Please try again later.';
  }
}
