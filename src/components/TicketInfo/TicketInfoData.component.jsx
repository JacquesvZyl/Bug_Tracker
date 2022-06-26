import React from "react";
import styles from "./TicketInfoData.module.scss";

function TicketInfoData({ data }) {
  return (
    <div className={styles.ticket__info}>
      <div className={styles["ticket__info--column"]}>
        <div className={styles["ticket__info--section"]}>
          <h4>Ticket Title</h4>
          <p>{data.title}</p>
        </div>
        <div className={styles["ticket__info--section"]}>
          <h4>Status</h4>
          <p>{data.status}</p>
        </div>
      </div>
      <div className={styles["ticket__info--column"]}>
        <div className={styles["ticket__info--section"]}>
          <h4>Author</h4>
          <p>{data.author}</p>
        </div>

        <div className={styles["ticket__info--section"]}>
          <h4>Priority</h4>
          <p>{data.priority}</p>
        </div>
      </div>
      <div className={styles["ticket__info--column"]}>
        <div className={styles["ticket__info--section"]}>
          <h4>Description</h4>
          <p>{data.description}</p>
        </div>
        <div className={styles["ticket__info--section"]}>
          <h4>Type</h4>
          <p>{data.type}</p>
        </div>
      </div>
      <div className={styles["ticket__info--column"]}>
        <div className={styles["ticket__info--section"]}>
          <h4>Time Estimate (hours)</h4>
          <p>{data.timeEstimate}</p>
        </div>
      </div>
    </div>
  );
}

export default TicketInfoData;
