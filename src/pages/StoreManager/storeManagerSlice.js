import { dashboardApi } from "@/api/dashboard";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isError: Boolean,
  loading: Boolean,
  data: [],
};
export const configStoreManagerSlice = createSlice({
  name: "storemanager",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const getAdminUsers = createAsyncThunk(
  "dashboard/getAdminUsers",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getAdminUser(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
export const getStores = createAsyncThunk(
  "dashboard/getStores",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getStore(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
export const getAreas = createAsyncThunk(
  "dashboard/getAreas",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getArea(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getStoreDetails = createAsyncThunk(
  "dashboard/getStoreDetails",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getStoreDetail(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getOrganizations = createAsyncThunk(
  "dashboard/getOrganizations",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getOrganization(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const storeManagerActions = configStoreManagerSlice.actions;

export default configStoreManagerSlice.reducer;
