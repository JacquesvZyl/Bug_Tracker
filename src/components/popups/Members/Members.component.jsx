import React, { useEffect, useState } from "react";
import styles from "./Members.module.scss";
import * as ReactDOM from "react-dom";
import Modal from "../modal/Modal.component";
import DisplayUser from "../../DisplayUser/DisplayUser.component";
import { editProject, getUsers } from "../../../Firebase/firebase";
import {
  returnSpecificUser,
  toastStyle,
  toastStyleError,
} from "../../../utils/Global";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "../../../app/projectDataSlice";
import ButtonWithSpinner from "../../ui/buttonWithSpinner/ButtonWithSpinner.component";

const rootElement = document.getElementById("modal-root");

function Members({ onClickHandler, currentProject }) {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const allUsers = useSelector((state) => state.allUsers.allUsers);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();

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

    setLoading(true);
    try {
      const filteredUsers = selectedUsers.map((user) => {
        return { id: user.id };
      });
      const data = {
        members: filteredUsers,
      };
      await editProject(currentProject.id, data, filteredUsers);
      dispatch(
        setCurrentProject({
          ...currentProject,
          members: filteredUsers,
        })
      );

      toast(`Members successfully updated`, {
        duration: 4000,
        style: toastStyle,
      });
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 4000,
        style: toastStyleError,
      });
    }
    setLoading(false);
  }

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <Modal onClick={onClickHandler} />
      <div className={styles.members}>
        <div className={styles.header}>
          <span className={styles.close} onClick={onClickHandler}>
            &#10006;
          </span>
        </div>
        <div className={styles.flex__container}>
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
                  const returnedUser = returnSpecificUser(allUsers, user.id);

                  return (
                    <tr key={user.id} className={styles.current__member}>
                      <td>{returnedUser?.fullName}</td>
                      <td>{returnedUser?.email}</td>
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
            <ButtonWithSpinner isLoading={loading} disabled={loading}>
              Edit Members
            </ButtonWithSpinner>
          </form>
        </div>
      </div>
    </div>,
    rootElement
  );
}

export default Members;
