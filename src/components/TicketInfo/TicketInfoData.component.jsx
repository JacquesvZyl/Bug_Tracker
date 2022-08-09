import React from "react";
import { priorityColors, returnSpecificUser } from "../../utils/Global";
import styles from "./TicketInfoData.module.scss";
import { useSelector } from "react-redux";

function TicketInfoData({ data }) {
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const author = returnSpecificUser(allUsers, data.author.id);
  const members = data.members.map((member) =>
    returnSpecificUser(allUsers, member.id)
  );

  return (
    <div className={styles.ticket__info}>
      <div className={`${styles["ticket__info--section"]} ${styles.title}`}>
        <h4>Ticket Title</h4>
        <p>{data.name}</p>
      </div>
      <div
        className={`${styles["ticket__info--section"]} ${styles["grid-col-span-2"]}`}
      >
        <h4>Description</h4>
        <p>{data.description}</p>
      </div>
      <div className={styles["ticket__info--section"]}>
        <h4>Author</h4>
        <p>{author.fullName}</p>
      </div>
      <div className={styles["ticket__info--section"]}>
        <h4>Time Estimate (hours)</h4>
        <p>{data.time}</p>
      </div>
      <div className={styles["ticket__info--section"]}>
        <h4>Created</h4>
        <p>{new Date(data.creationDate).toLocaleDateString()}</p>
      </div>
      <div className={`${styles["ticket__info--section"]} ${styles.color}`}>
        <h4>Status</h4>
        <p>{data.status}</p>
      </div>

      <div className={`${styles["ticket__info--section"]} ${styles.color}`}>
        <h4>Priority</h4>
        <p
          style={{
            backgroundColor: priorityColors[data.priority.toLowerCase()],
          }}
        >
          {data.priority}
        </p>
      </div>

      <div className={`${styles["ticket__info--section"]} ${styles.color}`}>
        <h4>Type</h4>
        <p>{data.type}</p>
      </div>
      <div
        className={`${styles["ticket__info--section"]} ${styles["grid-col-span-3"]} ${styles.members}`}
      >
        <h4>Assigned Members</h4>
        {members.map((member) => (
          <span key={member.id}>{member.fullName}</span>
        ))}
      </div>
    </div>
  );
}

export default TicketInfoData;
