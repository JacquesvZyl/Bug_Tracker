import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProject,
  setCurrentTicket,
} from "../../../app/projectDataSlice";
import { returnUserTickets } from "../../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { priorityColors } from "../../../utils/Global";
import styles from "./TicketsRoute.module.scss";

function TicketsRoute() {
  const user = useSelector((state) => state.user.user);
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets([]);

    async function getTickets() {
      returnUserTickets(user.uid, setTickets);
    }

    getTickets();
  }, [user.uid]);

  function onTicketClick(projectId, data) {
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
              <th>PROJECT</th>
              <th>TICKET</th>
              <th>STATUS</th>
              <th>PRIORITY</th>
              <th>CREATED</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => {
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
                  <td>{ticket.projectData?.title}</td>
                  <td>{ticket.name}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.priority}</td>
                  <td>{new Date(ticket.creationDate).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketsRoute;
