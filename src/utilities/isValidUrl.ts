import isURL from 'validator/lib/isURL';

const isValidURL = (url: string): boolean => {
  return isURL(url, {
    require_protocol: true, // this ensures the URL contains 'http://' or 'https://'
  });
};

export default isValidURL;
