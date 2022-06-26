import React from "react";
import Tickets from "../../Tickets/Tickets.component";
import styles from "./Project.module.scss";
import { useParams } from "react-router-dom";
import { testProjectData } from "../../../testData/testProjectData";
import TicketInfo from "../../TicketInfo/TicketInfo.component";
function Project(props) {
  const { id } = useParams();
  console.log(id);
  const currentProject = testProjectData.find((project) => project.id === +id);
  console.log(currentProject);
  return (
    <div className={styles.project}>
      <Tickets data={currentProject.tickets} />
      <TicketInfo />
    </div>
  );
}

export default Project;
