import React, { useEffect, useState } from "react";
import Tickets from "../../Tickets/Tickets.component";
import styles from "./Project.module.scss";
import { useParams } from "react-router-dom";

import TicketInfo from "../../TicketInfo/TicketInfo.component";
import { getTickets } from "../../../Firebase/firebase";

function Project() {
  const [tickets, setTickets] = useState(null);

  const { id: projectId } = useParams();

  useEffect(() => {
    async function showTickets() {
      await getTickets(projectId, setTickets);
    }

    showTickets();
  }, [projectId]);

  return (
    <div className={styles.project}>
      <Tickets tickets={tickets} projectId={projectId} />
      <TicketInfo />
    </div>
  );
}

export default Project;
