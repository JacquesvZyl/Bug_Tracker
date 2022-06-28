import React, { useRef, useState } from "react";
import Button from "../../ui/button/Button.component";
import Modal from "../modal/Modal.component";
import styles from "./AddTicket.module.scss";
import * as ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { createProject, createTicket } from "../../../Firebase/firebase";
import toast from "react-hot-toast";
import { toastStyleError } from "../../../utils/Global";
const rootElement = document.getElementById("modal-root");
function AddTicket({ id, onClickHandler }) {
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user.user);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const timeRef = useRef(null);
  const typeRef = useRef(null);
  const priorityRef = useRef(null);
  const statusRef = useRef(null);

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
        time.trim().length === 0
      )
        throw new Error("Please fill out all fields");

      await createTicket(id, {
        name,
        description,
        time,
        type,
        priority,
        status,
        author: user.fullName,
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
      <div className={styles.addTicket}>
        <div className={styles.header}>
          <h3>Add new Ticket</h3>
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
              id="ticket__name"
              ref={nameRef}
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="ticket__description">Ticket Description</label>
            <textarea
              placeholder="Enter Desription"
              id="ticket__description"
              className={styles.description}
              ref={descriptionRef}
            />
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="ticket__time">Time Estimate (Hours)</label>
            <input
              type="number"
              min={0}
              placeholder="1"
              id="ticket__time"
              ref={timeRef}
            />
          </div>
          <div className={styles.flex__wrapper}>
            <div className={styles.select}>
              <span>Type</span>
              <select name="type" ref={typeRef}>
                <option value="issue" defaultValue="true">
                  Issue
                </option>
                <option value="bug">Bug</option>
              </select>
            </div>
            <div className={styles.select}>
              <span>Priority</span>
              <select name="priority" ref={priorityRef}>
                <option value="low" defaultValue="true">
                  Low
                </option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className={styles.select}>
              <span>Status</span>
              <select name="status" ref={statusRef}>
                <option value="open" defaultValue="true">
                  Open
                </option>
                <option value="in progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          <Button style={{ padding: "10px 10px" }} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>,
    rootElement
  );
}

export default AddTicket;
