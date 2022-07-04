import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/button/Button.component";
import Modal from "../modal/Modal.component";
import styles from "./AddProject.module.scss";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as ReactDOM from "react-dom";
import {
  createProject,
  editProject,
  getUsers,
} from "../../../Firebase/firebase";
import { toastStyleError } from "../../../utils/Global";
import DisplayUser from "../../DisplayUser/DisplayUser.component";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "../../../app/projectDataSlice";
const rootElement = document.getElementById("modal-root");
function AddProject({ onClickHandler, isNew }) {
  const user = useSelector((state) => state.user.user);
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const [disabled, setDisabled] = useState(false);
  const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const nameRef = useRef(isNew ? null : currentProject.name);
  const descriptionRef = useRef(isNew ? null : currentProject.description);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserList() {
      try {
        await getUsers(setUsers);
      } catch (error) {
        console.log(error);
      }
    }

    getUserList();
  }, []);

  async function createProjectHandler(e) {
    e.preventDefault();
    setDisabled(true);
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    try {
      if (
        name.trim().length === 0 ||
        description.trim().length === 0 ||
        selectedUsers.length === 0
      )
        throw new Error("Please fill out all fields");

      const dbData = {
        name,
        description,
        members: selectedUsers,
        author: { user: user.fullName, id: user.uid },
      };
      if (isNew) {
        await createProject(dbData);
      } else {
        await editProject(currentProject.id, dbData, selectedUsers);
      }
      onClickHandler();
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 4000,
        style: toastStyleError,
      });
    }
    setDisabled(false);
  }

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <Modal onClick={onClickHandler} />
      <div className={styles.addProject}>
        <div className={styles.header}>
          <h3>{isNew ? "Add New Project" : "Edit Project"}</h3>
          <span className={styles.close} onClick={onClickHandler}>
            &#10006;
          </span>
        </div>
        <form onSubmit={createProjectHandler}>
          <div className={styles.input__wrapper}>
            <label htmlFor="project__name">Project Name</label>
            <input
              type="text"
              placeholder="Enter Project Name"
              id="project__name"
              ref={nameRef}
              defaultValue={isNew ? "" : currentProject.name}
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="project__description">Project Description</label>
            <textarea
              placeholder="Enter Desription"
              id="project__description"
              className={styles.description}
              ref={descriptionRef}
              defaultValue={isNew ? "" : currentProject.description}
            />
          </div>
          <div
            className={`${styles.input__wrapper} ${styles.members__wrapper}`}
          >
            <span>Add Team Members</span>
            <div className={styles.members}>
              {users?.map((user) => {
                return (
                  <DisplayUser
                    key={user.id}
                    selectedUserHandler={setSelectedUsers}
                    selectedUsers={selectedUsers}
                    user={user}
                    selectedList={isNew ? [] : currentProject.members}
                  >
                    {user.fullName}
                  </DisplayUser>
                );
              })}
            </div>
          </div>
          <Button
            disabled={disabled}
            style={{ padding: "10px 10px" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>,
    rootElement
  );
}

export default AddProject;
