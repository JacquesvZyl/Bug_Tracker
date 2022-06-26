import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTicket } from "../../app/projectDataSlice";
import Button from "../ui/button/Button.component";
import styles from "./Tickets.module.scss";

function Tickets({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTicket(null));
  }, []);

  function setTicket(e) {
    const id = e.target.dataset.id;
    const currentTicket = data.find((ticket) => ticket.id === +id);
    dispatch(setCurrentTicket(currentTicket));
  }

  return (
    <div className={styles.tickets__wrapper}>
      <div className={styles.header}>
        <h2>Tickets</h2>
        <Button>New Ticket</Button>
      </div>
      <table className={styles.projects}>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>AUTHOR</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket) => {
            return (
              <tr
                key={ticket.id}
                data-id={ticket.id}
                className={styles.ticket}
                onClick={setTicket}
              >
                <td className={styles.ticket__name} data-id={ticket.id}>
                  {ticket.title}
                </td>
                <td className={styles.project__description} data-id={ticket.id}>
                  {ticket.description}
                </td>
                <td data-id={ticket.id}>{ticket.author}</td>
                <td data-id={ticket.id}>{ticket.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Tickets;
