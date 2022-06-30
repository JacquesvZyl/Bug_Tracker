import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTicket } from "../../app/projectDataSlice";
import { getTickets } from "../../Firebase/firebase";
import AddTicket from "../popups/addTicket/AddTicket.component";
import Button from "../ui/button/Button.component";
import styles from "./Tickets.module.scss";

import TicketOptions from "../ticketOptions/TicketOptions.component";
import DeleteConfirmation from "../popups/deleteConfirmation/DeleteConfirmation.component";

function Tickets({ projectId }) {
  const dispatch = useDispatch();
  const [showTicketModal, setTicketModal] = useState(false);
  const [tickets, setTickets] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function showTickets() {
      await getTickets(projectId, setTickets);
    }

    showTickets();
  }, []);

  function showTicketHandler() {
    setTicketModal((prevVal) => !prevVal);
  }
  function showEditTicketHandler() {
    setShowEdit((prevVal) => !prevVal);
  }
  function showDeleteConfirmationHandler() {
    setShowDelete((prevVal) => !prevVal);
  }

  function setTicket(ticketId) {
    if (!ticketId) return;
    setTicketId((prevVal) => ticketId);
    const currentTicket = tickets?.find((ticket) => ticket.id === ticketId);
    console.log(currentTicket);
    dispatch(setCurrentTicket(currentTicket));
  }

  return (
    <>
      {showTicketModal && (
        <AddTicket
          id={projectId}
          isNew={true}
          onClickHandler={showTicketHandler}
        />
      )}
      {showEdit && (
        <AddTicket
          isNew={false}
          id={projectId}
          onClickHandler={showEditTicketHandler}
        />
      )}
      {showDelete && (
        <DeleteConfirmation
          onClickHandler={showDeleteConfirmationHandler}
          isTicket={true}
          ticketId={ticketId}
          projectId={projectId}
        />
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
              <th>CONTRIBUTORS</th>
              <th>TIME (HRS)</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>CREATED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => {
              return (
                <tr
                  key={ticket.id}
                  className={styles.ticket}
                  onClick={() => {
                    setTicket(ticket.id);
                  }}
                >
                  <td className={styles.ticket__name}>{ticket.name}</td>
                  <td className={styles.project__description}>
                    {ticket.description}
                  </td>
                  <td>
                    {ticket.members?.map((user) => (
                      <p key={user.id}>{user.fullName}</p>
                    ))}
                  </td>
                  <td>{ticket.time}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  <td>{new Date(ticket.creationDate).toLocaleDateString()}</td>
                  <TicketOptions
                    onClickDeleteHandler={showDeleteConfirmationHandler}
                    onClickEditHandler={showEditTicketHandler}
                    isTicket={true}
                  />
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
