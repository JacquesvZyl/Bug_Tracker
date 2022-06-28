import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTicket } from "../../app/projectDataSlice";
import { getTickets } from "../../Firebase/firebase";
import AddTicket from "../popups/addTicket/AddTicket.component";
import Button from "../ui/button/Button.component";
import styles from "./Tickets.module.scss";

function Tickets({ id }) {
  const dispatch = useDispatch();
  const [showTicketModal, setTcketModal] = useState(false);
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    async function showTickets() {
      await getTickets(id, setTickets);
    }

    showTickets();
  }, []);

  function showTicketHandler() {
    setTcketModal((prevVal) => !prevVal);
  }

  function setTicket(e) {
    const id = e.target.dataset.id;
    const currentTicket = tickets?.find((ticket) => ticket.id === id);
    console.log(currentTicket);
    dispatch(setCurrentTicket(currentTicket));
  }

  return (
    <>
      {showTicketModal && (
        <AddTicket id={id} onClickHandler={showTicketHandler} />
      )}
      <div className={styles.tickets__wrapper}>
        <div className={styles.header}>
          <h2>Tickets</h2>
          <Button onClick={showTicketHandler}>New Ticket</Button>
        </div>
        <table className={styles.projects}>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>AUTHOR</th>
              <th>ESTIMATED TIME (HRS)</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => {
              return (
                <tr
                  key={ticket.id}
                  data-id={ticket.id}
                  className={styles.ticket}
                  onClick={setTicket}
                >
                  <td className={styles.ticket__name} data-id={ticket.id}>
                    {ticket.name}
                  </td>
                  <td
                    className={styles.project__description}
                    data-id={ticket.id}
                  >
                    {ticket.description}
                  </td>
                  <td data-id={ticket.id}>{ticket.author}</td>
                  <td data-id={ticket.id}>{ticket.time}</td>
                  <td data-id={ticket.id}>{ticket.priority}</td>
                  <td data-id={ticket.id}>{ticket.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tickets;
