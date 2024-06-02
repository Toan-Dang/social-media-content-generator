import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://us-central1-content-generator-98bba.cloudfunctions.net/api',
  // if use local api, unlock code below and comment above code
  // baseURL: 'http://127.0.0.1:5001/content-generator-98bba/us-central1/api',
});

export default axiosInstance;
