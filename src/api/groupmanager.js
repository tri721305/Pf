import {
  API_CREATE_UPDATE_GROUP,
  API_GET_GROUP,
  API_GET_GROUP_INFO,
} from "@/constant/api";
import axiosClient from "./axiosClient";

export const groupManagerAPI = {
  getListGroup(payload) {
    return axiosClient.post(API_GET_GROUP, payload);
  },
  createUpdateGroup(payload) {
    return axiosClient.post(API_CREATE_UPDATE_GROUP, payload);
  },
  getGroupInfo(payload) {
    return axiosClient.post(API_GET_GROUP_INFO, payload);
  },
};
