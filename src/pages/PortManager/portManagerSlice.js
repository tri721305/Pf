import { portManagerAPI } from "@/api/portmanager";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const portManagerSlice = createSlice({
  initialState: initialState,
  name: "portManager",
  reducers: {},
});

export const getOrgPort = createAsyncThunk(
  "portManager/getOrgPort",
  async (body, { rejectWithValue }) => {
    try {
      const res = await portManagerAPI.getListOrgPort(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const updateOrgPort = createAsyncThunk(
  "portManager/updateOrgPort",
  async (body, { rejectWithValue }) => {
    try {
      const res = await portManagerAPI.updateOrgPort(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
