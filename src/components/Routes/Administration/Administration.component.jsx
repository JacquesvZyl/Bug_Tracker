import React, { useState } from "react";
import Organization from "../../Organization/Organization.component";
import OrganizationEdit from "../../OrganizationEdit/OrganizationEdit.component";
import styles from "./Administration.module.scss";

function Administration() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className={styles.administration}>
      <Organization setSelectedUser={setSelectedUser} />
      <OrganizationEdit selectedUser={selectedUser} />
    </div>
  );
}

export default Administration;
