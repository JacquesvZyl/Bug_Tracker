import React from "react";
import Projects from "../../projects/Projects.component";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Projects />
    </div>
  );
}

export default Dashboard;
