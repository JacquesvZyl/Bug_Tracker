import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectDataSlice";
import userReducer from "./userSlice";
import allUsersReducer from "./allUsersSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer,
    allUsers: allUsersReducer,
  },
});
