import { API_GET_PC_MANAGER, API_GET_DETAIL_PC } from "@/constant/api";
import axiosClient from "./axiosClient";

export const pcManagerAPI = {
  getPCManager(payload) {
    return axiosClient.post(API_GET_PC_MANAGER, payload);
  },
  getDetailPC(payload) {
    return axiosClient.post(API_GET_DETAIL_PC, payload);
  },
};
