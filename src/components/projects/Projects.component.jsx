import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button.component";
import styles from "./Projects.module.scss";
import { testProjectData } from "../../testData/testProjectData";
import { Link } from "react-router-dom";
import Modal from "../popups/modal/Modal.component";
import AddProject from "../popups/addProject/AddProject.component";
import { getProjects } from "../../Firebase/firebase";
import { useDispatch } from "react-redux";
import { setCurrentTicket } from "../../app/projectDataSlice";

function Projects() {
  const [showProjectModal, setProjectModal] = useState(false);
  const [projects, setProjects] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function setProjectdata() {
      await getProjects(setProjects);
      dispatch(setCurrentTicket(null));
    }

    setProjectdata();
  }, []);

  function onProjectModalClick() {
    setProjectModal((prevVal) => !prevVal);
  }

  return (
    <>
      {showProjectModal && <AddProject onClickHandler={onProjectModalClick} />}
      <div className={styles.projects__wrapper}>
        <div className={styles.header}>
          <h2>Projects</h2>
          <Button onClick={onProjectModalClick}>New Project</Button>
        </div>
        <table className={styles.projects}>
          <thead>
            <tr>
              <th>PROJECT</th>
              <th>DESCRIPTION</th>
              <th>CONTRIBUTORS</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => {
              return (
                <tr key={project.id}>
                  <td className={styles.project__name}>
                    <Link to={`/project/${project.id}`}>{project.name}</Link>
                  </td>
                  <td className={styles.project__description}>
                    {project.description}
                  </td>
                  <td>{project.members}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Projects;
