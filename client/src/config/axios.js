import axios from "axios";
import Cookies from 'js-cookie'

axios.interceptors.request.use(function (config) {
  const token = Cookies.get("tokenShine2023");
  config.headers.Authorization = `${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});
export default axios;
