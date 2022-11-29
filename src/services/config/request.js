import axios from 'axios';
import QueryString from 'qs';
import { message } from 'antd';
const defaultConfig = {
  baseURL: process.env.REACT_APP_ENV,
  timeout: 120 * 1000,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
};
const request = (method = 'get', url, params = {}, config) => {
  const finalConfig = { ...defaultConfig, ...config };
  const instance = axios.create(finalConfig);
  instance.interceptors.request.use(request => {
    return request;
  });
  instance.interceptors.response.use(
    response => {
      if (response.status === 200 && response.data.success) {
        return response.data;
      } else {
        return Promise.reject(response.data);
      }
    },
    error => {
      message.error('系统出错！');
      return Promise.reject(error);
    }
  );
  Object.keys(params).forEach(item => {
    if (item && (params[item] === undefined || params[item] === null)) {
      delete params[item];
    }
  });
  const data =
    finalConfig.headers['content-type'] === 'application/json'
      ? params
      : QueryString.stringify(params);
  return instance({
    method,
    url,
    params: (method === 'get' || method === 'delete') && params,
    data: method === 'post' && data,
  });
};
export default request;
