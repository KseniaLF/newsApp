import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilterValue(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setFilterValue } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

export const getFilterValue = (state: RootState) => state.filterValue;
