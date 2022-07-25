import React from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.scss";

function Profile() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className={styles.profile}>
      <form>
        <div className={styles.flex}>
          <div className={styles.input}>
            <label htmlFor="name">FIRST NAME</label>
            <input type="text" id="name" defaultValue={user?.name} />
          </div>
          <div className={styles.input}>
            <label htmlFor="surname">LAST NAME</label>
            <input type="text" id="surname" defaultValue={user?.surname} />
          </div>
        </div>
        <div className={styles.input}>
          <label htmlFor="email">EMAIL</label>
          <input type="text" id="email" defaultValue={user?.email} />
        </div>
      </form>
    </div>
  );
}

export default Profile;
