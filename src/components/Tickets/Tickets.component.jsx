import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTicket } from "../../app/projectDataSlice";
import AddTicket from "../popups/addTicket/AddTicket.component";
import Button from "../ui/button/Button.component";
import styles from "./Tickets.module.scss";
import { useLocation } from "react-router-dom";
import TicketOptions from "../ticketOptions/TicketOptions.component";
import DeleteConfirmation from "../popups/deleteConfirmation/DeleteConfirmation.component";
import { priorityColors, returnSpecificUser } from "../../utils/Global";
import TableHeader from "../TableHeaders/TableHeader.component";
import Paginate from "../Paginate/Paginate.component";
import Members from "../popups/Members/Members.component";
import { findProject } from "../../Firebase/firebase";

function Tickets({ projectId, tickets }) {
  const user = useSelector((state) => state.user.user);

  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const userHasNewTicketAccess =
    user?.role?.admin || user?.role?.submitter || user?.role?.developer;
  const userHasEditMembersAccess = user?.role?.admin || user?.role?.submitter;
  const userEditPermissions = user?.role?.admin || user?.role?.developer;
  const userDeletePermissions = user?.role?.admin;
  const [ticketData, setTicketData] = useState(null);
  const dispatch = useDispatch();
  const [sortedBtns, setSortedBtns] = useState({});
  const [currentItems, setCurrentItems] = useState(null);

  const currentTicketState = useSelector(
    (state) => state.projects.selectedTicket
  );

  const [showTicketModal, setTicketModal] = useState(false);
  const [showMemberModal, setMemberModal] = useState(false);

  const [ticketId, setTicketId] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const currentProjectId = pathname.split("/").slice(-1)[0];
    async function setCurrentProjectState() {
      const project = await findProject(currentProjectId);
      setCurrentProject(project);
    }

    setCurrentProjectState();
  }, [pathname]);

  useEffect(() => {
    if (!tickets) return;
    setTicketData(tickets);
  }, [tickets]);

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
            <Button
              disabled={!userHasEditMembersAccess}
              onClick={showMembersHandler}
            >
              Edit Members
            </Button>
            <Button
              disabled={!userHasNewTicketAccess}
              onClick={showTicketHandler}
            >
              New Ticket
            </Button>
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

              <th className={styles.hidden}>CONTRIBUTORS</th>
              <TableHeader
                isHidden={true}
                type={"time"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                TIME (HRS)
              </TableHeader>
              <TableHeader
                isHidden={true}
                type={"priority"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                PRIORITY
              </TableHeader>
              <TableHeader
                type={"status"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                STATUS
              </TableHeader>
              <TableHeader
                isHidden={true}
                type={"creationDate"}
                state={sortedBtns}
                setState={setSortedBtns}
                ticketState={ticketData}
                setTicketState={setTicketData}
              >
                CREATED
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
                  <td className={styles.hidden}>
                    {ticket.members?.map((user) => {
                      const currentUser = returnSpecificUser(allUsers, user.id);
                      return <p key={user.id}>{currentUser.fullName}</p>;
                    })}
                  </td>
                  <td className={styles.hidden}>{ticket.time}</td>
                  <td className={styles.hidden}>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  <td className={styles.hidden}>
                    {new Date(ticket.creationDate).toLocaleDateString()}
                  </td>
                  <TicketOptions
                    onClickDeleteHandler={showDeleteConfirmationHandler}
                    onClickEditHandler={showEditTicketHandler}
                    isTicket={true}
                    userEditPermissions={userEditPermissions}
                    userDeletePermissions={userDeletePermissions}
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
