import { groupManagerAPI } from "@/api/groupmanager";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};
export const groupManagerSlice = createSlice({
  initialState: initialState,
  reducers: {},
  name: "groupManagerSlice",
});

export const getListGroup = createAsyncThunk(
  "groupManagerSlice/getListGroup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await groupManagerAPI.getListGroup(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getGroupInfoc = createAsyncThunk(
  "groupManagerSlice/getGroupInfoc",
  async (body, { rejectWithValue }) => {
    try {
      const res = await groupManagerAPI.getGroupInfo(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const createUpdateGroup = createAsyncThunk(
  "groupManagerSlice/createUpdateGroup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await groupManagerAPI.createUpdateGroup(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
