import { API_GET_LIST_PACKAGE, API_UPDATE_PACKAGE } from "@/constant/api";
import axiosClient from "./axiosClient";

export const packageAPI = {
  getListPackage(payload) {
    return axiosClient.post(API_GET_LIST_PACKAGE, payload);
  },
  updatePackage(payload) {
    return axiosClient.post(API_UPDATE_PACKAGE, payload);
  },
};
