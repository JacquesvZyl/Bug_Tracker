import React from "react";
import Profile from "../../Profile/Profile.component";
import styles from "./ProfileRoute.module.scss";

function ProfileRoute() {
  return (
    <div className={styles.profile}>
      <Profile />
    </div>
  );
}

export default ProfileRoute;
