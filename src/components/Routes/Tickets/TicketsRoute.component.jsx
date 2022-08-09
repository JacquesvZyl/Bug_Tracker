import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProject,
  setCurrentTicket,
} from "../../../app/projectDataSlice";

import { getProjects, returnUserTickets } from "../../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { priorityColors } from "../../../utils/Global";
import styles from "./TicketsRoute.module.scss";
import TableHeader from "../../TableHeaders/TableHeader.component";
import Paginate from "../../Paginate/Paginate.component";
import Filter from "../../Filter/Filter.component";
import TotalCounter from "../../TotalCounter/TotalCounter.component";

function TicketsRoute() {
  const user = useSelector((state) => state.user.user);
  const filterState = useSelector((state) => state.projects.filter);
  //const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projects, setAllProjects] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState(null);
  const [sortButtons, setSortButtons] = useState({});
  const [currentItems, setCurrentItems] = useState(null);

  useEffect(() => {
    setTickets([]);

    async function getTickets() {
      returnUserTickets(user.uid, setTickets);
    }

    getTickets();
  }, [user.uid]);

  useEffect(() => {
    if (!tickets) return;

    const filteredTicketData = tickets.filter((ticket) => {
      if (
        filterState.priority === "" &&
        filterState.status === "" &&
        filterState.type === ""
      ) {
        return ticket;
      }
      if (
        ticket.priority.toLowerCase().includes(filterState.priority) &&
        ticket.status.toLowerCase().includes(filterState.status) &&
        ticket.type.toLowerCase().includes(filterState.type)
      ) {
        return ticket;
      }
      return false;
    });

    setFilteredTickets(filteredTicketData);
  }, [filterState, tickets]);

  useEffect(() => {
    async function getAllProjects() {
      await getProjects(setAllProjects);
    }

    getAllProjects();
  }, []);

  async function onTicketClick(projectId, data) {
    dispatch(setCurrentTicket(data));
    const currentProject = projects.filter(
      (project) => project.id === projectId
    );

    dispatch(setCurrentProject(...currentProject));
    navigate(`/project/${projectId}`);
  }

  return (
    <div className={styles.tickets}>
      <div className={styles.tickets__wrapper}>
        <div className={styles.header}>
          <h3>Tickets Assigned to You</h3>
        </div>
        <table className={styles.tickets__table}>
          <thead>
            <tr>
              <TableHeader
                type={"projectData.title"}
                state={sortButtons}
                setState={setSortButtons}
                ticketState={tickets}
                setTicketState={setTickets}
              >
                project
              </TableHeader>
              <TableHeader
                type={"name"}
                state={sortButtons}
                setState={setSortButtons}
                ticketState={tickets}
                setTicketState={setTickets}
              >
                ticket
              </TableHeader>
              <TableHeader
                type={"status"}
                state={sortButtons}
                setState={setSortButtons}
                ticketState={tickets}
                setTicketState={setTickets}
              >
                status
              </TableHeader>
              <TableHeader
                type={"priority"}
                state={sortButtons}
                setState={setSortButtons}
                ticketState={tickets}
                setTicketState={setTickets}
                isHidden={true}
              >
                priority
              </TableHeader>
              <TableHeader
                isHidden={true}
                type={"creationDate"}
                state={sortButtons}
                setState={setSortButtons}
                ticketState={tickets}
                setTicketState={setTickets}
              >
                created
              </TableHeader>
              <th>
                <Filter />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((ticket) => {
              return (
                <tr
                  style={{
                    backgroundColor:
                      priorityColors[ticket.priority?.toLowerCase()],
                  }}
                  key={ticket.id}
                  className={styles.ticket}
                  onClick={() => {
                    onTicketClick(ticket.projectData.id, ticket);
                  }}
                >
                  <td className={styles.project__title}>
                    {ticket.projectData?.title}
                  </td>
                  <td className={styles.ticket__title}>{ticket.name}</td>
                  <td className={`${styles.status} ${styles.capitalize}`}>
                    {ticket.status}
                  </td>
                  <td
                    className={`${styles.priority} ${styles.hidden} ${styles.capitalize}`}
                  >
                    {ticket.priority}
                  </td>
                  <td className={`${styles.date} ${styles.hidden}`}>
                    {new Date(ticket.creationDate).toLocaleDateString()}
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <TotalCounter data={filteredTickets} />

        <Paginate data={filteredTickets} setCurrentItems={setCurrentItems} />
      </div>
    </div>
  );
}

export default TicketsRoute;
