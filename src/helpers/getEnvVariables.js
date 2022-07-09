export const getEnvVariables = () => {
  return {
    VITE_MODE: import.meta.env.VITE_MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };
};
