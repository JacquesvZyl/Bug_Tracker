import React from "react";
import Modal from "../modal/Modal.component";
import styles from "./TicketDropdown.module.scss";

function TicketDropdown({
  onClickHandler,
  onClickDeleteHandler,
  onClickEditHandler,
  isTicket,
}) {
  function deleteTicketHandler() {
    onClickHandler();
    onClickDeleteHandler();
  }
  function editTicketHandler() {
    onClickHandler();
    onClickEditHandler();
  }
  return (
    <>
      <div className={styles.ticket__dropdown}>
        <p onClick={editTicketHandler}>
          Edit {isTicket ? "Ticket" : "Project"}
        </p>
        <p onClick={deleteTicketHandler}>
          Delete {isTicket ? "Ticket" : "Project"}
        </p>
        <Modal
          onClick={onClickHandler}
          style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        />
      </div>
    </>
  );
}

export default TicketDropdown;
