import React, { useState } from "react";
import Modal from "../modal/Modal.component";
import styles from "./DeleteConfirmation.module.scss";
import * as ReactDOM from "react-dom";
import Button from "../../ui/button/Button.component";
import { deleteProject, deleteTicket } from "../../../Firebase/firebase";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCurrentTicket } from "../../../app/projectDataSlice";
import CancelIcon from "@mui/icons-material/Cancel";
const rootElement = document.getElementById("modal-root");

function DeleteConfirmation({ onClickHandler, isTicket, ticketId, projectId }) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  /*   const currentTicketState = useSelector(
    (state) => state.projects.selectedTicket
  ); */

  async function deleteTicketHandler() {
    setDisabled(true);
    try {
      if (isTicket) {
        await deleteTicket(projectId, ticketId);
        dispatch(setCurrentTicket(null));
      } else {
        await deleteProject(projectId);
      }
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
    onClickHandler();
  }

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.confirmation}>
        <CancelIcon className={styles.icon} />
        <span>Are you sure?</span>
        <div className={styles.text}>
          <p>Do you really want to delete this record?</p>
          <p>This process cannot be undone.</p>
        </div>
        <div className={styles.button__container}>
          <Button onClick={onClickHandler}>Cancel</Button>
          <Button
            className={styles.delete__button}
            onClick={deleteTicketHandler}
            disabled={disabled}
          >
            Delete
          </Button>
        </div>
        <Modal onClick={onClickHandler} />
      </div>
    </div>,
    rootElement
  );
}

export default DeleteConfirmation;
