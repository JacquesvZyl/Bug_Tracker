import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/button/Button.component";
import styles from "./OrganizationEdit.module.scss";
import toast from "react-hot-toast";
import { toastStyle, toastStyleError } from "../../utils/Global";
import { deleteUser, setUserRole } from "../../Firebase/firebase";
import { useSelector } from "react-redux";

function OrganizationEdit({ selectedUser }) {
  const loggedInUser = useSelector((state) => state.user.user);

  const role =
    selectedUser?.role &&
    Object.keys(selectedUser?.role).find(
      (key) => selectedUser?.role[key] === true
    );

  const roleRef = useRef(role);

  async function EditUserHandler(e) {
    e.preventDefault();
    try {
      if (loggedInUser?.role?.admin !== true) {
        throw new Error("insufficent permissions");
      }
      setUserRole(selectedUser.id, roleRef.current.value);
      toast(`Role Changed Successfully`, {
        duration: 4000,
        style: toastStyle,
      });
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 4000,
        style: toastStyleError,
      });
    }
  }
  return (
    <div className={styles.organization__edit}>
      <h3>Edit User Role</h3>

      {selectedUser ? (
        <form onSubmit={EditUserHandler}>
          <span>
            Selected User:{" "}
            <span className={styles.username}>{selectedUser.fullName}</span>
          </span>
          <div className={styles.input}>
            <label htmlFor="auth">Role:</label>
            <select
              name="auth"
              id="auth"
              key={role}
              ref={roleRef}
              defaultValue={role}
            >
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="submitter">Submitter</option>
              <option value="readOnly">Read Only</option>
            </select>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p>No user selected</p>
      )}
    </div>
  );
}

export default OrganizationEdit;
