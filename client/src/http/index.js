import axios from 'axios';
import Cookies from 'js-cookie';

const $host = axios.create({
  baseURL: process.env.API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${Cookies.get('jwt')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
