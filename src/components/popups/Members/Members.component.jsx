import React, { useEffect, useState } from "react";
import styles from "./Members.module.scss";
import * as ReactDOM from "react-dom";
import Modal from "../modal/Modal.component";
import DisplayUser from "../../DisplayUser/DisplayUser.component";
import { editProject, getUsers } from "../../../Firebase/firebase";
import Button from "../../ui/button/Button.component";
import { toastStyleError } from "../../../utils/Global";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "../../../app/projectDataSlice";

const rootElement = document.getElementById("modal-root");

function Members({ onClickHandler, currentProject }) {
  const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();
  console.log(currentProject.id);

  useEffect(() => {
    async function getUserList() {
      try {
        await getUsers(setUsers);
      } catch (error) {
        console.log(error);
      }
    }

    getUserList();
  }, []);

  async function editMembersHandler(e) {
    e.preventDefault();

    try {
      const data = {
        members: selectedUsers,
      };
      await editProject(currentProject.id, data, selectedUsers);
      dispatch(
        setCurrentProject({
          ...currentProject,
          members: selectedUsers,
        })
      );
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 4000,
        style: toastStyleError,
      });
    }
  }

  console.log(users);
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <Modal onClick={onClickHandler} />
      <div className={styles.members}>
        <div className={styles.current__members}>
          <span className={styles.header}>Assigned Members</span>
          <table className={styles.members__table}>
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {currentProject?.members?.map((user) => {
                return (
                  <tr key={user.id} className={styles.current__member}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <form className={styles.add__members} onSubmit={editMembersHandler}>
          <span className={styles.header}>Available members</span>
          <div className={styles.border}>
            {users?.map((user) => {
              return (
                <DisplayUser
                  key={user.id}
                  selectedUserHandler={setSelectedUsers}
                  selectedUsers={selectedUsers}
                  user={user}
                  selectedList={currentProject?.members}
                >
                  {user.fullName}
                </DisplayUser>
              );
            })}
          </div>
          <Button>Edit Members</Button>
        </form>
      </div>
    </div>,
    rootElement
  );
}

export default Members;
