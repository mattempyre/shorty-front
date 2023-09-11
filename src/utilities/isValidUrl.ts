import isURL from 'validator/lib/isURL';

// Define a function to check if a given string is a valid URL
const isValidURL = (url: string): boolean => {
  // Use the 'isURL' function from the 'validator' library to validate the URL
  return isURL(url, {
    require_protocol: false, // This option ensures that the URL can start without 'http://' or 'https://'
  });
};

// Export the 'isValidURL' function as the default export of this module
export default isValidURL;
