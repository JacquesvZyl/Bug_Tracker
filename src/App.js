import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";

import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./components/Routes/Dashboard/Dashboard.component";
import Project from "./components/Routes/project/Project.component";

import {
  getUserDetails,
  getUsers,
  onAuthStateChangeListener,
} from "./Firebase/firebase";
import { login, logout } from "./app/userSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProptectedRoute.component";
import Login from "./components/Routes/Login/Login.component";
import ProtectedLoggedInRoute from "./components/ProtectedLoggedInRoute/ProtectedLoggedInRoute.component";
import TicketsRoute from "./components/Routes/Tickets/TicketsRoute.component";
import Administration from "./components/Routes/Administration/Administration.component";
import ProfileRoute from "./components/Routes/Profile/ProfileRoute.component";
import { setUsers } from "./app/allUsersSlice";
import toast from "react-hot-toast";
import { toastStyleError } from "./utils/Global";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [display, setDisplay] = useState(false);
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    setDisplay(false);
    const unsubscribe = onAuthStateChangeListener(async (user) => {
      if (user) {
        const data = await getUserDetails(user.uid);

        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            fullName: data.fullName,
            surname: data.surname,
            name: data.name,
            role: data.role,
            profilePicture: data.profilePicture,
          })
        );
      } else {
        //logged out
        dispatch(logout());
      }
      setDisplay(true);
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        await getUsers(setAllUsers);
      } catch (error) {
        toast(`⚠ ${error.message}`, {
          duration: 4000,
          style: toastStyleError,
        });
      }
    }

    getAllUsers();
  }, [currentUser]);

  useEffect(() => {
    dispatch(setUsers(allUsers));
  }, [allUsers, dispatch]);

  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute display={display} />}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/tickets" element={<TicketsRoute />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/profile" element={<ProfileRoute />} />
          </Route>
        </Route>
        <Route element={<ProtectedLoggedInRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
