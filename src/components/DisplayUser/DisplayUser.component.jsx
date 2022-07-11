import React, { useEffect, useState } from "react";
import styles from "./DisplayUser.module.scss";
function DisplayUser({
  children,
  selectedUserHandler,
  selectedUsers,
  user,
  selectedList,
  ...rest
}) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (selectedList?.length === 0) return;
    const isInList = selectedList?.some((u) => u.id === user.id);
    setClicked(isInList);
    if (!isInList) return;
    const filtered = selectedUsers.filter((u) => u.id !== user.id);
    selectedUserHandler((prevVal) => filtered);
  }, []);

  useEffect(() => {
    if (clicked) {
      selectedUserHandler((prevVal) => [...prevVal, user]);
    } else {
      const isInList = selectedUsers.some((u) => u.id === user.id);
      if (!isInList) return;
      const filtered = selectedUsers.filter((u) => u.id !== user.id);
      selectedUserHandler((prevVal) => filtered);
    }
  }, [clicked, user, selectedUserHandler]);

  function clickedHandler() {
    setClicked((prevVal) => !prevVal);
  }
  return (
    <span
      className={`${styles.user} ${clicked && styles.clicked}`}
      onClick={clickedHandler}
      {...rest}
    >
      {children}
    </span>
  );
}

export default DisplayUser;
