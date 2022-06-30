import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button.component";
import styles from "./Projects.module.scss";
import { testProjectData } from "../../testData/testProjectData";
import { Link } from "react-router-dom";
import Modal from "../popups/modal/Modal.component";
import AddProject from "../popups/addProject/AddProject.component";
import { findProject, getProjects } from "../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProjects,
  setCurrentProject,
  setCurrentTicket,
} from "../../app/projectDataSlice";
import TicketOptions from "../ticketOptions/TicketOptions.component";
import DeleteConfirmation from "../popups/deleteConfirmation/DeleteConfirmation.component";

function Projects() {
  const [showProjectModal, setProjectModal] = useState(false);
  const [projects, setProjects] = useState(null);
  const [showEditProjectModal, setEditProjectModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [projectId, setProjectId] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function setProjectdata() {
      await getProjects(setProjects);
      dispatch(setCurrentTicket(null));
    }

    setProjectdata();
  }, []);
  useEffect(() => {
    dispatch(setAllProjects(projects));
  }, [projects, dispatch]);

  function setProjectIdHandler(project) {
    setProjectId((prevVal) => project.id);
    dispatch(
      setCurrentProject({
        ...project,
      })
    );
  }

  function showEditProjectHandler() {
    setEditProjectModal((prevVal) => !prevVal);
  }
  function showDeleteConfirmationHandler() {
    setShowDelete((prevVal) => !prevVal);
  }

  function onProjectModalClick() {
    setProjectModal((prevVal) => !prevVal);
  }

  return (
    <>
      {showProjectModal && (
        <AddProject onClickHandler={onProjectModalClick} isNew={true} />
      )}
      {showEditProjectModal && (
        <AddProject onClickHandler={showEditProjectHandler} isNew={false} />
      )}
      {showDelete && (
        <DeleteConfirmation
          onClickHandler={showDeleteConfirmationHandler}
          isTicket={false}
          projectId={projectId}
        />
      )}
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
              <th>CREATED</th>
              <th>MODIFIED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => {
              return (
                <tr
                  key={project.id}
                  onClick={() => {
                    setProjectIdHandler(project);
                  }}
                >
                  <td className={styles.project__name}>
                    <Link to={`/project/${project.id}`}>{project.name}</Link>
                  </td>
                  <td className={styles.project__description}>
                    {project.description}
                  </td>
                  <td>
                    {project.members?.length > 0 &&
                      project.members?.map((member) => (
                        <p key={member.id}>{member.fullName}</p>
                      ))}
                  </td>
                  <td>
                    {project.creationDate &&
                      new Date(project.creationDate).toLocaleTimeString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </td>
                  <td>
                    {project.modifiedDate &&
                      new Date(project.modifiedDate).toLocaleString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </td>
                  <TicketOptions
                    onClickDeleteHandler={showDeleteConfirmationHandler}
                    onClickEditHandler={showEditProjectHandler}
                    isTicket={false}
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

export default Projects;
