import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: null,
  selectedProject: null,
  selectedTicket: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    removeProjects: (state) => {
      state.projects = null;
    },
    setCurrentProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setCurrentTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
  },
});

export const {
  setProjects,
  removeProjects,
  setCurrentProject,
  setCurrentTicket,
} = projectsSlice.actions;

export default projectsSlice.reducer;
