import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/pages/Login/loginSlice";
import storeManagerReducer from "@/pages/StoreManager/storeManagerSlice";
import dashboardReducer from "@/pages/Dashboard/dashboardSlice";
import thunk from "redux-thunk";
import cameraPermissionReducer from "@/pages/CameraPermission/cameraPermissionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    storemanager: storeManagerReducer,
    dashboard: dashboardReducer,
    camerapermission: cameraPermissionReducer,
  },
});
