import axios from "axios";
import { getCookie } from "@/util";
import {
  API_GET_TOKEN,
  API_GET_USER,
  BASIC_KEY_SSO,
  BASIC_KEY,
} from "@/constant/api";
export const instanceLogin = axios.create({ baseURL: API_GET_TOKEN });

instanceLogin.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Basic ${BASIC_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const instanceLoginSSO = axios.create({ baseURL: API_GET_TOKEN });
instanceLoginSSO.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Basic ${BASIC_KEY_SSO}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function instanceUserInfo() {
  const contant = axios.create();
  contant.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${getCookie("token")}`;
      //dev
      config.baseURL = API_GET_USER;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return contant;
}
