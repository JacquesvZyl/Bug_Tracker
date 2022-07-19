import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/button/Button.component";
import styles from "./OrganizationEdit.module.scss";
import toast from "react-hot-toast";
import { toastStyleError } from "../../utils/Global";
import { deleteUser } from "../../Firebase/firebase";

function OrganizationEdit({ selectedUser }) {
  const nameRef = useRef(selectedUser?.name);
  const surnameRef = useRef(selectedUser?.surname);
  const emailRef = useRef(selectedUser?.email);
  const role =
    selectedUser?.role &&
    Object.keys(selectedUser?.role).find(
      (key) => selectedUser?.role[key] === true
    );

  console.log(role);
  const roleRef = useRef(role);

  async function deleteUserHandler() {
    try {
      await deleteUser(selectedUser.id);
    } catch (error) {
      console.warn(error.message);
    }
  }

  async function EditUserHandler(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const email = emailRef.current.value;
    try {
      if (
        name.trim().length === 0 ||
        surname.trim().length === 0 ||
        email.trim().length === 0
      )
        throw new Error("Inputs cannot be empty");
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 4000,
        style: toastStyleError,
      });
    }
  }
  return (
    <div className={styles.organization__edit}>
      <h3>Edit User Information</h3>
      <div>
        {selectedUser ? (
          <form onSubmit={EditUserHandler}>
            <div className={styles.flex}>
              <div className={styles.input}>
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  id="name"
                  key={selectedUser?.name}
                  defaultValue={selectedUser?.name}
                  ref={nameRef}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="surname">Last Name</label>
                <input
                  type="text"
                  id="surname"
                  key={selectedUser?.surname}
                  defaultValue={selectedUser?.surname}
                  ref={surnameRef}
                />
              </div>
            </div>
            <div className={styles.flex}>
              <div className={styles.input}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  key={selectedUser?.email}
                  defaultValue={selectedUser?.email}
                  ref={emailRef}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="auth">Role</label>
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
                </select>
              </div>
            </div>
            <div className={styles.buttons}>
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={deleteUserHandler}>
                Delete User
              </Button>
            </div>
          </form>
        ) : (
          <p>No user selected</p>
        )}
      </div>
    </div>
  );
}

export default OrganizationEdit;
