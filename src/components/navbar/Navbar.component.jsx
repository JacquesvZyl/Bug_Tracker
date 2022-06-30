import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOutUser } from "../../Firebase/firebase";
import { useSelector } from "react-redux";
import bugTrackerLogo from "../../assets/images/bugTracker.png";

function Navbar() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const user = useSelector((state) => state.user.user);

  async function signOutHandler() {
    await signOutUser();
  }
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <img src={bugTrackerLogo} alt="logo" />
        </div>
        <div className={styles.greet}>
          <span>Hi, {user.name}!</span>
        </div>
        <div className={styles.links}>
          <Link to="/">Dashboard</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/admin-panel">Administration</Link>
        </div>
        <button className={styles.logout} onClick={signOutHandler}>
          Logout
        </button>
      </header>
      <div className={styles.header}>
        <h1>{currentPage}</h1>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
