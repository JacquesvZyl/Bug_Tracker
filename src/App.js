import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";

import { useDispatch } from "react-redux";
import Dashboard from "./components/Routes/Dashboard/Dashboard.component";
import Project from "./components/Routes/project/Project.component";

import { onAuthStateChangeListener } from "./Firebase/firebase";
import { login, logout } from "./app/userSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProptectedRoute.component";
import Login from "./components/Routes/Login/Login.component";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        //logged in
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      } else {
        //logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
