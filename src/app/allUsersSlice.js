import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
};

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;
