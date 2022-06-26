import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectDataSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer,
  },
});
