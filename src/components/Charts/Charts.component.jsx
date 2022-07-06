import React, { useEffect, useState } from "react";
import Chart from "./Chart.component";

import { getAllTickets } from "../../Firebase/firebase";
import styles from "./Charts.module.scss";

function Charts() {
  const [ticketData, setTicketData] = useState([]);
  useEffect(() => {
    async function getTicketData() {
      const resp = await getAllTickets();

      setTicketData(resp);
    }

    getTicketData();
  }, []);

  const priorityData = {
    labels: ["Low", "Medium", "High", "Critical"],

    datasets: [
      {
        label: "Tickets by Priority",
        data: [
          ticketData.filter((ticket) => ticket.priority === "low").length,
          ticketData.filter((ticket) => ticket.priority === "medium").length,
          ticketData.filter((ticket) => ticket.priority === "high").length,
          ticketData.filter((ticket) => ticket.priority === "critical").length,
        ],
        backgroundColor: ["#8AB4F8", "#F2ED00", "#F1B02C", "#da4232"],
        borderColor: ["#8AB4F8", "#F2ED00", "#F1B02C", "#da4232"],
        borderWidth: 1,
      },
    ],
  };
  const statusData = {
    labels: ["Open", "in Progress", "Pending", "Resolved"],

    datasets: [
      {
        label: "Tickets by Status",
        data: [
          ticketData.filter((ticket) => ticket.status === "open").length,
          ticketData.filter((ticket) => ticket.status === "in progress").length,
          ticketData.filter((ticket) => ticket.status === "pending").length,
          ticketData.filter((ticket) => ticket.status === "resolved").length,
        ],
        backgroundColor: ["#8AB4F8", "#F2ED00", "#F1B02C", "#0fb918"],
        borderColor: ["#8AB4F8", "#F2ED00", "#F1B02C", "#0fb918"],
        borderWidth: 1,
      },
    ],
  };
  const typeData = {
    labels: ["Issue", "Bug", "Feature Request"],

    datasets: [
      {
        label: "Tickets by Type",
        data: [
          ticketData.filter((ticket) => ticket.type.toLowerCase() === "issue")
            .length,
          ticketData.filter((ticket) => ticket.type.toLowerCase() === "bug")
            .length,
          ticketData.filter(
            (ticket) => ticket.type.toLowerCase() === "feature request"
          ).length,
        ],
        backgroundColor: ["#8AB4F8", "#F1B02C", "#da4232"],
        borderColor: ["#8AB4F8", "#F1B02C", "#da4232"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Chart data={priorityData} />
      <Chart data={typeData} />
      <Chart data={statusData} />
    </div>
  );
}

export default Charts;
