import React from "react";
import styles from "./TicketInfo.module.scss";
import TicketInfoData from "./TicketInfoData.component";
import { useSelector } from "react-redux";
import Comments from "./Comments.component";

function TicketInfo({ tickets }) {
  const ticketData = useSelector((state) => state.projects.selectedTicket);
  return (
    <div className={styles.ticket__info__wrapper}>
      <div className={styles.header}>
        <h3>Ticket Info</h3>
      </div>

      {ticketData ? (
        <div className={styles.info}>
          <TicketInfoData data={ticketData} />
          <Comments data={ticketData} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TicketInfo;
