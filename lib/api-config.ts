// Create a configuration file for API endpoints
const isDevelopment = process.env.NODE_ENV === 'development';

// Use localhost in development, production URL otherwise
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8080/api/v1' 
  : 'https://www.blackv.works/api/v1';

export default API_BASE_URL;
