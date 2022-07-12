import React, { useEffect, useState } from "react";
import { getUsers } from "../../Firebase/firebase";
import styles from "./Organization.module.scss";

function Organization({ setSelectedUser }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getUsersData() {
      await getUsers(setUsers);
    }

    getUsersData();
  }, []);

  return (
    <div className={styles.organization}>
      <h3>Organization</h3>
      <div className={styles.users}>
        {users?.map((user) => {
          return (
            <div
              key={user.id}
              className={styles.user}
              onClick={() => {
                setSelectedUser({ ...user });
              }}
            >
              <span>{user.fullName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Organization;
