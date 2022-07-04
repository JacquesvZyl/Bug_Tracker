import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";

import { useDispatch } from "react-redux";
import Dashboard from "./components/Routes/Dashboard/Dashboard.component";
import Project from "./components/Routes/project/Project.component";

import { getUserDetails, onAuthStateChangeListener } from "./Firebase/firebase";
import { login, logout } from "./app/userSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProptectedRoute.component";
import Login from "./components/Routes/Login/Login.component";
import ProtectedLoggedInRoute from "./components/ProtectedLoggedInRoute/ProtectedLoggedInRoute.component";
import TicketsRoute from "./components/Routes/Tickets/TicketsRoute.component";

function App() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);

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

  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute display={display} />}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/tickets" element={<TicketsRoute />} />
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
