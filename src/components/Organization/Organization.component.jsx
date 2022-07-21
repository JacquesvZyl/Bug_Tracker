import React, { useEffect, useState } from "react";
import { getUsers } from "../../Firebase/firebase";
import Paginate from "../Paginate/Paginate.component";
import TableHeader from "../TableHeaders/TableHeader.component";
import styles from "./Organization.module.scss";

function Organization({ setSelectedUser }) {
  const [users, setUsers] = useState(null);
  const [sortedBtns, setSortedBtns] = useState({});
  const [currentItems, setCurrentItems] = useState(null);

  useEffect(() => {
    async function getUsersData() {
      await getUsers(setUsers);
    }

    getUsersData();
  }, []);

  return (
    <div className={styles.organization}>
      <h3>Organization</h3>
      <table className={styles.users}>
        <thead>
          <tr>
            <TableHeader
              type={"name"}
              state={sortedBtns}
              setState={setSortedBtns}
              ticketState={users}
              setTicketState={setUsers}
            >
              First Name
            </TableHeader>
            <TableHeader
              type={"surname"}
              state={sortedBtns}
              setState={setSortedBtns}
              ticketState={users}
              setTicketState={setUsers}
            >
              Last Name
            </TableHeader>
            <TableHeader
              type={"email"}
              state={sortedBtns}
              setState={setSortedBtns}
              ticketState={users}
              setTicketState={setUsers}
            >
              Email
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((user) => {
            return (
              <tr
                key={user.id}
                className={styles.user}
                onClick={() => {
                  setSelectedUser({ ...user });
                }}
              >
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Paginate
        data={users}
        itemsPerPage={10}
        setCurrentItems={setCurrentItems}
      />
    </div>
  );
}

export default Organization;
