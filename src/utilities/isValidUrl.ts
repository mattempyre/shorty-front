const isValidURL = (url: string): boolean => {
  // Regex pattern for URL validation with optional protocols and required TLD and domain
  const urlRegex =
    /^(?:(https?|ftp):\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/\S*)?$/i;

  // Check if the URL matches the regex pattern
  return urlRegex.test(url);
};

export default isValidURL;
