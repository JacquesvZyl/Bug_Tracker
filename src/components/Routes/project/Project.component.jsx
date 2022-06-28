import React, { useEffect, useState } from "react";
import Tickets from "../../Tickets/Tickets.component";
import styles from "./Project.module.scss";
import { useParams } from "react-router-dom";
import { testProjectData } from "../../../testData/testProjectData";
import TicketInfo from "../../TicketInfo/TicketInfo.component";
import { findProject } from "../../../Firebase/firebase";
import { setCurrentProject } from "../../../app/projectDataSlice";
import { useSelector, useDispatch } from "react-redux";
function Project() {
  //const [currentProject, setCurrentProject] = useState(null);
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    async function setProject() {
      let project = await findProject(id);

      console.log(project);
      dispatch(setCurrentProject(project));
    }

    setProject();
  }, [id]);
  console.log(id);
  //const currentProject = testProjectData.find((project) => project.id === +id);
  console.log(currentProject);
  return (
    <div className={styles.project}>
      <Tickets data={currentProject} id={id} />
      <TicketInfo />
    </div>
  );
}

export default Project;
