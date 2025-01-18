import { packageAPI } from "@/api/package";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

export const packageManagerSlice = createSlice({
  name: "packageManager",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const getListPackage = createAsyncThunk(
  "package/getListPackage",
  async (body, { rejectWithValue }) => {
    try {
      const res = await packageAPI.getListPackage(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const updatePackage = createAsyncThunk(
  "package/updatePackage",
  async (body, { rejectWithValue }) => {
    try {
      const res = await packageAPI.updatePackage(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
