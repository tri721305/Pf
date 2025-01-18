import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cameraPermissionAPI } from "@/api/camerapermission";
import { slideCameraAPI } from "@/api/slidecamera";

const initialState = {
  isError: Boolean,
  data: [],
  listGroup: [],
};

export const cameraPermissionSlice = createSlice({
  name: "cameraPermission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const getCameraPermission = createAsyncThunk(
  "cameraPermission/getCameraPermission",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.getCameraPermission(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getListDepartment = createAsyncThunk(
  "cameraPermission/getListDepartment",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.getListDepartment(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getListPosition = createAsyncThunk(
  "cameraPermission/getListPosition",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.getListPosition(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getListRole = createAsyncThunk(
  "cameraPermission/getListRole",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.getListRole(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const assignRole = createAsyncThunk(
  "cameraPermission/assignRole",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.assignRole(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getListRoleUser = createAsyncThunk(
  "cameraPermission/assigetListRoleUsergnRole",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.getListRoleUser(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
export const getListPositions = createAsyncThunk(
  "cameraPermission/getListPositions",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.getListPosition(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const assignUserRole = createAsyncThunk(
  "cameraPermission/assignUserRole",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.assignUserRole(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const assignAreaRole = createAsyncThunk(
  "cameraPermission/assignAreaRole",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.assignAreaRole(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
export const getListRoleArea = createAsyncThunk(
  "cameraPermission/getListRoleArea",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.getListRoleArea(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const removeAreaRole = createAsyncThunk(
  "cameraPermission/removeAreaRole",
  async (body, { rejectWithValue }) => {
    try {
      const res = await cameraPermissionAPI.removeAreaRole(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const cameraPermissionActions = cameraPermissionSlice.actions;

export default cameraPermissionSlice.reducer;
