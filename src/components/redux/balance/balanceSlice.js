import { createSlice } from "@reduxjs/toolkit";
import { app, db } from "utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(app);
const user = auth.currentUser;

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: 0,
  },
  reducers: {
    FETCH_BALANCE: (state, action) => {
      state.value = action.payload;
    },
    BALANCE_DECREMENT: (state, action) => {
      state.value -= action.payload;
    },
    BALANCE_INCREMENT: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { BALANCE_DECREMENT, BALANCE_INCREMENT, FETCH_BALANCE } =
  balanceSlice.actions;
export default balanceSlice.reducer;
