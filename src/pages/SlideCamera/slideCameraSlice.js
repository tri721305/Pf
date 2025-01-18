import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { slideCameraAPI } from "@/api/slidecamera";

const initialState = {
  isError: Boolean,
  data: [],
  listGroup: [],
};

export const slideCameraSlice = createSlice({
  name: "slideCamera",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const getSlideCamera = createAsyncThunk(
  "slideCamera/getSlideCamera",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.getSlideCamera(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getListGroup = createAsyncThunk(
  "slideCamera/getListGroup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.getListGroup(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
export const createGroup = createAsyncThunk(
  "slideCamera/createGroup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.createGroup(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const removeItem = createAsyncThunk(
  "slideCamera/removeItem",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.removeItem(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getCameraChannel = createAsyncThunk(
  "slideCamera/getCameraChannel",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.getCameraAvailable(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const addCameraSliderItem = createAsyncThunk(
  "slideCamera/addCameraSliderItem",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.addCameraSliderItem(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const addUserToGroup = createAsyncThunk(
  "slideCamera/addUserToGroup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.addUserToGroup(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const removeUserFromGroup = createAsyncThunk(
  "slideCamera/removeUserFromGroup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.removeUserFromGroup(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getUsersInGroup = createAsyncThunk(
  "slideCamera/getUsersInGroup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await slideCameraAPI.getUsersInGroup(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getListPositions = createAsyncThunk(
  "slideCamera/getListPositions",
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
