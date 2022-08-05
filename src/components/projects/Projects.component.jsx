import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button.component";
import styles from "./Projects.module.scss";

import { Link } from "react-router-dom";

import AddProject from "../popups/addProject/AddProject.component";
import { getProjects } from "../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProjects,
  setCurrentProject,
  setCurrentTicket,
} from "../../app/projectDataSlice";
import TicketOptions from "../ticketOptions/TicketOptions.component";
import DeleteConfirmation from "../popups/deleteConfirmation/DeleteConfirmation.component";
import TableHeader from "../TableHeaders/TableHeader.component";
import Paginate from "../Paginate/Paginate.component";
import { returnSpecificUser } from "../../utils/Global";

function Projects() {
  const [showProjectModal, setProjectModal] = useState(false);
  const [projects, setProjects] = useState(null);
  const [showEditProjectModal, setEditProjectModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [projectId, setProjectId] = useState(false);
  const [orderButtons, setOrderButtons] = useState({});
  const [currentItems, setCurrentItems] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const userHasAccess = user?.role?.admin || user?.role?.submitter;
  const userHasDeleteAccess = user?.role?.admin;
  console.log(userHasAccess);

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
          <h3>Projects</h3>
          <Button disabled={!userHasAccess} onClick={onProjectModalClick}>
            New Project
          </Button>
        </div>

        <table className={styles.projects}>
          <thead>
            <tr>
              <TableHeader
                type={"name"}
                state={orderButtons}
                setState={setOrderButtons}
                ticketState={projects}
                setTicketState={setProjects}
              >
                project
              </TableHeader>
              <TableHeader
                type={"description"}
                state={orderButtons}
                setState={setOrderButtons}
                ticketState={projects}
                setTicketState={setProjects}
              >
                description
              </TableHeader>

              <th className={styles.hidden}>CONTRIBUTORS</th>
              <TableHeader
                isHidden={true}
                type={"creationDate"}
                state={orderButtons}
                setState={setOrderButtons}
                ticketState={projects}
                setTicketState={setProjects}
              >
                created
              </TableHeader>
              <TableHeader
                isHidden={true}
                type={"modifiedDate"}
                state={orderButtons}
                setState={setOrderButtons}
                ticketState={projects}
                setTicketState={setProjects}
              >
                modified
              </TableHeader>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((project) => {
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
                  <td className={styles.hidden}>
                    {allUsers &&
                      project.members?.length > 0 &&
                      project.members?.map((member) => {
                        const selectedUser = returnSpecificUser(
                          allUsers,
                          member.id
                        );
                        return <p key={member.id}>{selectedUser?.fullName}</p>;
                      })}
                  </td>
                  <td className={styles.hidden}>
                    {project.creationDate &&
                      new Date(project.creationDate).toLocaleTimeString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </td>
                  <td className={styles.hidden}>
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
                    userEditPermissions={userHasDeleteAccess}
                    userDeletePermissions={userHasDeleteAccess}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>

        <Paginate
          data={projects}
          itemsPerPage={5}
          setCurrentItems={setCurrentItems}
        />
      </div>
    </>
  );
}

export default Projects;
