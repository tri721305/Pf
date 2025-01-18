import { pcManagerAPI } from "@/api/pcmanager";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPCManger = createAsyncThunk(
  "pcManager/getPCManger",
  async (body, { rejectWithValue }) => {
    try {
      const res = await pcManagerAPI.getPCManager(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);

export const getDetailPC = createAsyncThunk(
  "pcManager/getDetailPC",
  async (body, { rejectWithValue }) => {
    try {
      const res = await pcManagerAPI.getDetailPC(body);
      const data = res?.data?.object || [];
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.errorReason);
      return rejectWithValue(error?.data);
    }
  }
);
