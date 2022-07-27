import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/button/Button.component";
import Modal from "../modal/Modal.component";
import styles from "./AddTicket.module.scss";
import * as ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import {
  createProject,
  createTicket,
  editTicket,
  findProject,
} from "../../../Firebase/firebase";
import toast from "react-hot-toast";
import { toastStyleError } from "../../../utils/Global";
import DisplayUser from "../../DisplayUser/DisplayUser.component";
const rootElement = document.getElementById("modal-root");
function AddTicket({ id: projectId, onClickHandler, isNew }) {
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user.user);
  const currentTicket = useSelector((state) => state.projects.selectedTicket);
  const nameRef = useRef(isNew ? null : currentTicket.name);
  const descriptionRef = useRef(isNew ? null : currentTicket.description);
  const timeRef = useRef(isNew ? null : currentTicket.time);
  const typeRef = useRef(isNew ? null : currentTicket.type);
  const priorityRef = useRef(isNew ? null : currentTicket.priority);
  const statusRef = useRef(isNew ? null : currentTicket.status);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    async function getCurrentProject() {
      const data = await findProject(projectId);
      setCurrentProject({ ...data, id: projectId });
    }

    getCurrentProject();
  }, [projectId]);

  async function createTicketHandler(e) {
    e.preventDefault();
    setDisabled(true);
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;
    const type = typeRef.current.value;
    const priority = priorityRef.current.value;
    const status = statusRef.current.value;
    try {
      if (
        name.trim().length === 0 ||
        description.trim().length === 0 ||
        time.trim().length === 0 ||
        selectedUsers.length === 0
      )
        throw new Error("Please fill out all fields");

      const filteredUsers = selectedUsers.map((user) => {
        return { id: user.id };
      });

      const data = {
        name,
        description,
        time,
        type,
        priority,
        status,
        author: {
          id: user.uid,
        },
        members: filteredUsers,

        projectData: {
          id: currentProject.id,
          title: currentProject.name,
          description: currentProject.description,
        },
      };

      isNew
        ? await createTicket(projectId, data, selectedUsers)
        : await editTicket(projectId, currentTicket.id, data, selectedUsers);
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
      <div className={styles.addTicket}>
        <div className={styles.header}>
          <h3>{isNew ? "Add new Ticket" : "Edit Ticket"}</h3>
          <span className={styles.close} onClick={onClickHandler}>
            &#10006;
          </span>
        </div>
        <form onSubmit={createTicketHandler}>
          <div className={styles.input__wrapper}>
            <label htmlFor="ticket__name">Title</label>
            <input
              type="text"
              placeholder="Enter Ticket Title"
              maxLength={200}
              id="ticket__name"
              ref={nameRef}
              defaultValue={isNew ? "" : currentTicket.name}
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="ticket__description">Ticket Description</label>
            <textarea
              maxLength={250}
              placeholder="Enter Desription"
              id="ticket__description"
              className={styles.description}
              ref={descriptionRef}
              defaultValue={isNew ? "" : currentTicket.description}
            />
          </div>
          <div className={styles.flex__wrapper}>
            <div className={styles.input__wrapper}>
              <label htmlFor="ticket__time">Time Estimate (HRS)</label>
              <input
                type="number"
                min={0.5}
                step=".5"
                placeholder="1"
                id="ticket__time"
                ref={timeRef}
                defaultValue={isNew ? "" : currentTicket.time}
              />
            </div>
            <div className={styles.select}>
              <span>Type</span>
              <select
                name="type"
                ref={typeRef}
                defaultValue={isNew ? "issue" : currentTicket.type}
              >
                <option value="Issue">Issue</option>
                <option value="Bug">Bug</option>
                <option value="Feature Request">Feature Request</option>
              </select>
            </div>
            <div className={styles.select}>
              <span>Priority</span>
              <select
                name="priority"
                ref={priorityRef}
                defaultValue={isNew ? "low" : currentTicket.priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className={styles.select}>
              <span>Status</span>
              <select
                name="status"
                ref={statusRef}
                defaultValue={isNew ? "open" : currentTicket.status}
              >
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div
            className={`${styles.input__wrapper} ${styles.members__wrapper}`}
          >
            <span>Add Team Members</span>
            <div className={styles.members}>
              {currentProject?.members?.map((user) => {
                return (
                  <DisplayUser
                    key={user.id}
                    selectedUserHandler={setSelectedUsers}
                    selectedUsers={selectedUsers}
                    user={user}
                    selectedList={isNew ? [] : currentTicket.members}
                  >
                    {user.fullName}
                  </DisplayUser>
                );
              })}
            </div>
          </div>
          <Button
            style={{ padding: "10px 10px" }}
            type="submit"
            disabled={disabled}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>,
    rootElement
  );
}

export default AddTicket;
