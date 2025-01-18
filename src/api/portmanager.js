import { API_GET_ORG_PORT, API_UPDATE_ORG_PORT } from "@/constant/api";
import axiosClient from "./axiosClient";

export const portManagerAPI = {
  getListOrgPort(payload) {
    return axiosClient.post(API_GET_ORG_PORT, payload);
  },
  updateOrgPort(payload) {
    return axiosClient.post(API_UPDATE_ORG_PORT, payload);
  },
};
