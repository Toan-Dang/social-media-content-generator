import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://us-central1-content-generator-98bba.cloudfunctions.net/api',
  // baseURL: 'http://127.0.0.1:5001/content-generator-98bba/us-central1/api',
});

export default axiosInstance;
