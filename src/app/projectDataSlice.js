import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: null,
  selectedProject: null,
  selectedTicket: null,
  paginationPageCount: 5,
  filter: {
    status: "",
    priority: "",
    type: "",
  },
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
    setCurrentProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setCurrentTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    setPaginationCount: (state, action) => {
      state.paginationPageCount = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setAllProjects,
  removeProjects,
  setCurrentProject,
  setCurrentTicket,
  setPaginationCount,
  setFilter,
} = projectsSlice.actions;

export default projectsSlice.reducer;
