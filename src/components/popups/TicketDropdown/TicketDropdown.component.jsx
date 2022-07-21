import React from "react";
import toast from "react-hot-toast";

import { toastStyleError } from "../../../utils/Global";
import Modal from "../modal/Modal.component";
import styles from "./TicketDropdown.module.scss";

function TicketDropdown({
  onClickHandler,
  onClickDeleteHandler,
  onClickEditHandler,
  isTicket,
  userEditPermissions,
  userDeletePermissions,
}) {
  function deleteTicketHandler() {
    if (!userDeletePermissions) {
      toast(`⚠ Insufficient permissions to Delete this item`, {
        duration: 4000,
        style: toastStyleError,
      });
      return;
    }
    onClickHandler();
    onClickDeleteHandler();
  }
  function editTicketHandler() {
    onClickHandler();
    if (!userEditPermissions) {
      toast(`⚠ Insufficient permissions to Edit this item`, {
        duration: 4000,
        style: toastStyleError,
      });
      return;
    }
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
