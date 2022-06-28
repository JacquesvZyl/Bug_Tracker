import React, { useRef, useState } from "react";
import Button from "../../ui/button/Button.component";
import Modal from "../modal/Modal.component";
import styles from "./AddProject.module.scss";
import toast from "react-hot-toast";
import * as ReactDOM from "react-dom";
import { createProject } from "../../../Firebase/firebase";
import { toastStyleError } from "../../../utils/Global";
const rootElement = document.getElementById("modal-root");
function AddProject({ onClickHandler }) {
  const [disabled, setDisabled] = useState(false);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const teamMembersRef = useRef(null);

  async function createProjectHandler(e) {
    e.preventDefault();
    setDisabled(true);
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const members = teamMembersRef.current.value;
    try {
      if (
        name.trim().length === 0 ||
        description.trim().length === 0 ||
        members.trim().length === 0
      )
        throw new Error("Please fill out all fields");

      await createProject({
        name,
        description,
        members,
      });
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
          <h3>Add new Project</h3>
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
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="project__description">Project Description</label>
            <textarea
              placeholder="Enter Desription"
              id="project__description"
              className={styles.description}
              ref={descriptionRef}
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="project__members">Add Team Members</label>
            <input
              type="textArea"
              placeholder="Project Members placeholder"
              id="project__members"
              ref={teamMembersRef}
            />
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
