import { dashboardApi } from "@/api/dashboard";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isError: Boolean,
  loading: Boolean,
  data: [],
  upsert: {},
  listFireWallById: [],
  listFWConfig: [],
  sendEvent: [],
  addDevice: [],
  listMonitor: [],
  listItf: [],
  childrenBreakCrumb: null,
};
export const configDashBoardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setChildrenBreakCrumb: (state, action) => {
      state.childrenBreakCrumb = action.payload;
    },
    resetState: (state, action) => {
      state.childrenBreakCrumb = null;
    },
  },
  extraReducers: (builder) => {},
});

export const getListFireWalls = createAsyncThunk(
  "dashboard/getListDashboard",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getDashboard(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
export const getStatistics = createAsyncThunk(
  "dashboard/getStatistics",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getStatistic(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getFirewall = createAsyncThunk(
  "dashboard/getFirewall",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.getFirewall(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
export const dashboardActions = configDashBoardSlice.actions;

export default configDashBoardSlice.reducer;
