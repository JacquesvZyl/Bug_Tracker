import React, { useState } from "react";
import styles from "./Team.module.scss";

function Team() {
  const [show, setShow] = useState(false);

  function showHandler() {
    setShow((prevVal) => !prevVal);
  }
  return (
    <div className={styles.team}>
      <span onClick={showHandler}>Team</span>
      {show && (
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jacques van Zyl</td>
              <td>Test@test.com</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Team;
