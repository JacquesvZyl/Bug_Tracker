import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTicket } from "../../app/projectDataSlice";
import AddTicket from "../popups/addTicket/AddTicket.component";
import Button from "../ui/button/Button.component";
import styles from "./Tickets.module.scss";

import TicketOptions from "../ticketOptions/TicketOptions.component";
import DeleteConfirmation from "../popups/deleteConfirmation/DeleteConfirmation.component";
import { priorityColors } from "../../utils/Global";
import TableHeader from "../TableHeaders/TableHeader.component";
import Paginate from "../Paginate/Paginate.component";
import Members from "../popups/Members/Members.component";
import { findProject } from "../../Firebase/firebase";

function Tickets({ projectId, tickets }) {
  console.log(tickets);
  const [ticketData, setTicketData] = useState(null);
  const dispatch = useDispatch();
  const [sortedBtns, setSortedBtns] = useState({});
  const [currentItems, setCurrentItems] = useState(null);

  const currentProject = useSelector((state) => state.projects.selectedProject);
  const currentTicketState = useSelector(
    (state) => state.projects.selectedTicket
  );

  const [showTicketModal, setTicketModal] = useState(false);
  const [showMemberModal, setMemberModal] = useState(false);

  const [ticketId, setTicketId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (!tickets) return;
    setTicketData(tickets);
  }, [tickets]);

  /*   useEffect(() => {
    async function getCurrentProject() {
      const data = await findProject(projectId);
      setCurrentProject(data);
    }

    getCurrentProject();
  }, [projectId]); */

  useEffect(() => {
    if (!ticketId) return;
    const currentTicket = tickets?.find((ticket) => ticket.id === ticketId);
    dispatch(setCurrentTicket(currentTicket));
  }, [ticketId, tickets]);

  function showTicketHandler() {
    setTicketModal((prevVal) => !prevVal);
  }
  function showMembersHandler() {
    setMemberModal((prevVal) => !prevVal);
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
  }

  return (
    <>
      {showMemberModal && (
        <Members
          onClickHandler={showMembersHandler}
          currentProject={currentProject}
        />
      )}
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
      <div className={styles.project__details}>
        <h2>{currentProject?.name}</h2>
      </div>
      <div className={styles.tickets__wrapper}>
        <div className={styles.header}>
          <h3>Tickets</h3>
          <div className={styles.buttons}>
            <Button onClick={showMembersHandler}>Edit Members</Button>
            <Button onClick={showTicketHandler}>New Ticket</Button>
          </div>
        </div>
        <table className={styles.tickets}>
          <thead>
            <tr>
              <TableHeader
                type={"name"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                Title
              </TableHeader>
              <TableHeader
                type={"description"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                DESCRIPTION
              </TableHeader>

              <th>CONTRIBUTORS</th>
              <TableHeader
                type={"time"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                time (hrs)
              </TableHeader>
              <TableHeader
                type={"priority"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                priority
              </TableHeader>
              <TableHeader
                type={"status"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                status
              </TableHeader>
              <TableHeader
                type={"creationDate"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                created
              </TableHeader>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((ticket) => {
              return (
                <tr
                  style={{
                    backgroundColor:
                      priorityColors[ticket.priority.toLowerCase()],
                  }}
                  key={ticket.id}
                  className={`${styles.ticket} ${
                    currentTicketState?.id === ticket.id ? styles.selected : ""
                  }`}
                  onClick={() => {
                    setTicket(ticket.id);
                  }}
                >
                  <td className={styles.ticket__name}>{ticket.name}</td>
                  <td className={styles.ticket__description}>
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
        <Paginate
          data={ticketData}
          itemsPerPage={5}
          setCurrentItems={setCurrentItems}
        />
      </div>
    </>
  );
}

export default Tickets;
