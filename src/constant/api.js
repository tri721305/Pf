"use client";
let PFSENSE_URL = "https://betaerp.tgdd.vn/mwg-app-pfsense-controller-service";
let AUTH_BASE_URL = "https://betaerp.tgdd.vn/mwg-app-auth-service";

if (import.meta.env.VITE_APP_STAGE === "production") {
  PFSENSE_URL = "https://erpapp.tgdd.vn/mwg-app-web-bi-service";
  AUTH_BASE_URL = "https://erpapp.tgdd.vn/mwg-app-auth-service";
} else if (import.meta.env.VITE_APP_STAGE === "development") {
  PFSENSE_URL = "https://betaerp.tgdd.vn/mwg-app-pfsense-controller-service";
  AUTH_BASE_URL = "https://betaerp.tgdd.vn/mwg-app-auth-service";
}

export const API_GET_TOKEN = AUTH_BASE_URL + "/oauth/token";
export const API_GET_USER = AUTH_BASE_URL + "/api/auth";

// ============================== DASHBOARD ==================================

export const API_GET_DASHBOARD = PFSENSE_URL + "/api/firewall/device/list";
export const API_GET_STATISTIC = PFSENSE_URL + "/api/admin/statistic";

// ============================== STORE MANAGER ==================================
export const API_GET_STORE = PFSENSE_URL + "/api/store/list";
export const API_GET_AREA = PFSENSE_URL + "/api/admin/area/list";
export const API_GET_ADMIN_USER = PFSENSE_URL + "/api/admin/user/list";
export const API_GET_STORE_DETAIL = PFSENSE_URL + "/api/store/info";
export const API_GET_ORGANIZATION = PFSENSE_URL + "/api/organization/list";
export const API_GET_FIREWALL = PFSENSE_URL + "/api/firewall/device/info";

// ============================== SLIDE CAMERA ==================================
export const API_GET_SLIDE_CAMERA = PFSENSE_URL + "/api/cameraSlider/list";
export const API_GET_LIST_GROUP = PFSENSE_URL + "/api/cameraSlider/listGroup";
export const API_CREATE_GROUP = PFSENSE_URL + "/api/cameraSlider/upsert";
export const API_REMOVE_ITEM_SLIDE =
  PFSENSE_URL + "/api/cameraSlider/removeItem";

export const API_GET_CAMERA_CHANNEL =
  PFSENSE_URL + "/api/cameraSlider/getCameraChannelAvailble";

export const API_ADD_CAMERA_ITEM = PFSENSE_URL + "/api/cameraSlider/addItem";
export const API_GET_USERS_IN_GROUP =
  PFSENSE_URL + "/api/cameraSlider/slideGroup/getUsers";
export const API_ADD_USER_TO_GROUP =
  PFSENSE_URL + "/api/cameraSlider/slideGroup/addUser";
export const API_REMOVE_USER_FROM_GROUP =
  PFSENSE_URL + "/api/cameraSlider/slideGroup/removeUser";

// ============================== CAMERA PERMISSION ==================================

export const API_GET_CAMERA_PERMISSION =
  PFSENSE_URL + "/api/admin/camera/getListDepartmentRoleGranted";
export const API_GET_LIST_DEPARTMENT =
  PFSENSE_URL + "/api/admin/getListDepartments";
export const API_GET_LIST_POSITION =
  PFSENSE_URL + "/api/admin/getListPositions";
export const API_GET_LIST_ROLE = PFSENSE_URL + "/api/admin/role/list";
export const ASSIGN_ROLE = PFSENSE_URL + "/api/admin/camera/assignRole";
export const API_GET_LIST_ROLE_USER =
  PFSENSE_URL + "/api/admin/camera/getListUserStoreRoleGranted";
export const API_ASSIGN_USER_STORE_ROLE =
  PFSENSE_URL + "/api/admin/camera/assignUserStoreRole";
export const API_GET_AREA_ROLE =
  PFSENSE_URL + "/api/admin/camera/getListUserAreaOrganizationGranted";
export const API_ASSIGN_ROLE_AREA =
  PFSENSE_URL + "/api/admin/camera/assignUserAreaOrganization";
export const API_REMOVE_ROLE_AREA =
  PFSENSE_URL + "/api/admin/camera/deleteUserAreaRole";
export const API_GET_PC_MANAGER = PFSENSE_URL + "/api/pcmonitor/list";
export const API_GET_DETAIL_PC = PFSENSE_URL + "/api/pcmonitor/info";

export const API_GET_LIST_PACKAGE = PFSENSE_URL + "/api/admin/pkg/list";
export const API_UPDATE_PACKAGE = PFSENSE_URL + "/api/admin/pkg/create-update";

export const API_GET_ORG_PORT =
  PFSENSE_URL + "/api/admin/organization/port/list";

export const API_UPDATE_ORG_PORT =
  PFSENSE_URL + "/api/admin/organization/port/create-update";

export const API_GET_GROUP = PFSENSE_URL + "/api/admin/group/list";
export const API_CREATE_UPDATE_GROUP =
  PFSENSE_URL + "/api/admin/group/create-update";
export const API_GET_GROUP_INFO = PFSENSE_URL + "/api/admin/group/info";
