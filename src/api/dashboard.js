import {
  API_GET_ADMIN_USER,
  API_GET_AREA,
  API_GET_DASHBOARD,
  API_GET_FIREWALL,
  API_GET_ORGANIZATION,
  API_GET_STATISTIC,
  API_GET_STORE,
  API_GET_STORE_DETAIL,
} from "@/constant/api";
import axiosClient from "./axiosClient";

export const dashboardApi = {
  getFirewall(payload) {
    return axiosClient.post(API_GET_FIREWALL, payload);
  },
  getOrganization(payload) {
    return axiosClient.post(API_GET_ORGANIZATION, payload);
  },
  getStoreDetail(payload) {
    return axiosClient.post(API_GET_STORE_DETAIL, payload);
  },
  getArea(payload) {
    return axiosClient.post(API_GET_AREA, payload);
  },
  getStore(payload) {
    return axiosClient.post(API_GET_STORE, payload);
  },
  getDashboard(payload) {
    return axiosClient.post(API_GET_DASHBOARD, payload);
  },
  getStatistic(payload) {
    return axiosClient.post(API_GET_STATISTIC, payload);
  },
  getAdminUser(payload) {
    return axiosClient.post(API_GET_ADMIN_USER, payload);
  },
};
