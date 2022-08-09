import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../Firebase/firebase";
import { useSelector } from "react-redux";
import bugTrackerLogo from "../../assets/images/bugTracker.png";
import { useLocation } from "react-router-dom";
import { Burger } from "@mantine/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture.component";
import { MdSpaceDashboard } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

function Navbar() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [opened, setOpened] = useState(false);

  const user = useSelector((state) => state.user.user);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("ticket")) {
      setCurrentPage("Tickets");
    } else if (pathname.includes("admin")) {
      setCurrentPage("Admin Panel");
    } else if (pathname.includes("profile")) {
      setCurrentPage("My Profile");
    } else {
      setCurrentPage("Dashboard");
    }
  }, [pathname]);

  function setLink(link) {
    setCurrentPage(link);
    setOpened(false);
  }
  async function signOutHandler() {
    await signOutUser();
  }
  return (
    <>
      <header className={`${styles.navbar} ${opened && styles.navbar__open}`}>
        <div className={styles.logo}>
          <img src={bugTrackerLogo} alt="logo" />
        </div>
        <div className={styles.profile__picture}>
          <ProfilePicture profileImage={user.profilePicture} />
        </div>
        <div className={styles.greet}>
          <span>Hi, {user.name}!</span>
        </div>
        <div className={styles.links}>
          <Link to="/" onClick={() => setLink("Dashboard")}>
            <MdSpaceDashboard /> Dashboard
          </Link>
          <Link to="/tickets" onClick={() => setLink("Tickets")}>
            <IoTicket /> Tickets
          </Link>
          <Link to="/profile" onClick={() => setLink("My Profile")}>
            <ImProfile /> Edit Profile
          </Link>
          {user.role?.admin && (
            <Link to="/administration" onClick={() => setLink("Admin Panel")}>
              <MdAdminPanelSettings /> Administration
            </Link>
          )}
        </div>
        <button className={styles.logout} onClick={signOutHandler}>
          Logout
        </button>
      </header>

      <div className={styles.header}>
        <div className={styles.header__contents}>
          <h1>{currentPage}</h1>
          <Burger
            color="white"
            className={styles.hamburger}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
