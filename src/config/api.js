import axios from 'axios';
import { serverURL } from './config';

const api = axios.create({
  baseURL: serverURL,
});

export default api;
