import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOutUser } from "../../Firebase/firebase";

function Navbar() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  async function signOutHandler() {
    await signOutUser();
  }
  return (
    <>
      <header className={styles.navbar}>
        <p>Logo Here</p>
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
