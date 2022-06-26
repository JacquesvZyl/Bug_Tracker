import React from "react";
import Button from "../../ui/button/Button.component";
import Modal from "../modal/Modal.component";
import styles from "./AddProject.module.scss";
import * as ReactDOM from "react-dom";
const rootElement = document.getElementById("modal-root");
function addProject({ onClickHandler }) {
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
        <form>
          <div className={styles.input__wrapper}>
            <label htmlFor="project__name">Project Name</label>
            <input
              type="text"
              placeholder="Enter Project Name"
              id="project__name"
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="project__description">Project Description</label>
            <textarea
              placeholder="Enter Desription"
              id="project__description"
              className={styles.description}
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="project__members">Add Team Members</label>
            <input
              type="textArea"
              placeholder="Project Members placeholder"
              id="project__members"
            />
          </div>
        </form>
        <Button style={{ padding: "10px 10px" }}>Submit</Button>
      </div>
    </div>,
    rootElement
  );
}

export default addProject;
