const axios = require('axios').default;

const TIME_OUT = 1 * 60 * 1000;

const request = axios.create({
  baseURL: '',
  timeout: TIME_OUT
});

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

request.interceptors.response.use((response) => response.data);

module.exports = request;
