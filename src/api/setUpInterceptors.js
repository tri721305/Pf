import axiosClient from "./axiosClient";
import { getCookie } from "@/util";
const setUpInterceptors = () => {
  axiosClient.interceptors.request.use(
    (config) => {
      const token = getCookie("token");
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
};
export default setUpInterceptors;
