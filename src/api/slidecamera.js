import {
  API_GET_SLIDE_CAMERA,
  API_GET_LIST_GROUP,
  API_CREATE_GROUP,
  API_REMOVE_ITEM_SLIDE,
  API_GET_CAMERA_CHANNEL,
  API_ADD_CAMERA_ITEM,
  API_GET_USERS_IN_GROUP,
  API_ADD_USER_TO_GROUP,
  API_REMOVE_USER_FROM_GROUP,
  API_GET_LIST_POSITION,
} from "@/constant/api";
import axiosClient from "./axiosClient";

export const slideCameraAPI = {
  getListPosition(payload) {
    return axiosClient.post(API_GET_LIST_POSITION, payload);
  },
  removeUserFromGroup(payload) {
    return axiosClient.post(API_REMOVE_USER_FROM_GROUP, payload);
  },
  addUserToGroup(payload) {
    return axiosClient.post(API_ADD_USER_TO_GROUP, payload);
  },
  getUsersInGroup(payload) {
    return axiosClient.post(API_GET_USERS_IN_GROUP, payload);
  },
  addCameraSliderItem(payload) {
    return axiosClient.post(API_ADD_CAMERA_ITEM, payload);
  },
  getCameraAvailable(payload) {
    return axiosClient.post(API_GET_CAMERA_CHANNEL, payload);
  },
  removeItem(payload) {
    return axiosClient.post(API_REMOVE_ITEM_SLIDE, payload);
  },
  getSlideCamera(payload) {
    return axiosClient.post(API_GET_SLIDE_CAMERA, payload);
  },
  getListGroup(payload) {
    return axiosClient.post(API_GET_LIST_GROUP, payload);
  },
  createGroup(payload) {
    return axiosClient.post(API_CREATE_GROUP, payload);
  },
};
