import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: null,
  selectedTicket: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAllProjects: (state, action) => {
      state.projects = action.payload;
    },
    removeProjects: (state) => {
      state.projects = null;
    },
    setCurrentTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
  },
});

export const { setAllProjects, removeProjects, setCurrentTicket } =
  projectsSlice.actions;

export default projectsSlice.reducer;
