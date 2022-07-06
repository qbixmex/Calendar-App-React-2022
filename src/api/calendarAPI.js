import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarAPI = axios.create({
  baseURL: VITE_API_URL
});

// Configure Interceptors

export default calendarAPI;
