import {
  API_ASSIGN_ROLE_AREA,
  API_ASSIGN_USER_STORE_ROLE,
  API_GET_AREA_ROLE,
  API_GET_CAMERA_PERMISSION,
  API_GET_DETAIL_PC,
  API_GET_LIST_DEPARTMENT,
  API_GET_LIST_ROLE,
  API_GET_LIST_ROLE_USER,
  API_REMOVE_ROLE_AREA,
  ASSIGN_ROLE,
} from "@/constant/api";
import axiosClient from "./axiosClient";

export const cameraPermissionAPI = {
  getCameraPermission(payload) {
    return axiosClient.post(API_GET_CAMERA_PERMISSION, payload);
  },
  getListDepartment(payload) {
    return axiosClient.post(API_GET_LIST_DEPARTMENT, payload);
  },
  getListRole(payload) {
    return axiosClient.post(API_GET_LIST_ROLE, payload);
  },
  assignRole(payload) {
    return axiosClient.post(ASSIGN_ROLE, payload);
  },
  getListRoleUser(payload) {
    return axiosClient.post(API_GET_LIST_ROLE_USER, payload);
  },
  assignUserRole(payload) {
    return axiosClient.post(API_ASSIGN_USER_STORE_ROLE, payload);
  },
  getListRoleArea(payload) {
    return axiosClient.post(API_GET_AREA_ROLE, payload);
  },
  assignAreaRole(payload) {
    return axiosClient.post(API_ASSIGN_ROLE_AREA, payload);
  },
  removeAreaRole(payload) {
    return axiosClient.post(API_REMOVE_ROLE_AREA, payload);
  },
};
