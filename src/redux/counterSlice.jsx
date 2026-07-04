import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    customCounter: (state, customCount) => {
      state.value = customCount.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, reset, customCounter } =
  counterSlice.actions;

export default counterSlice.reducer;
