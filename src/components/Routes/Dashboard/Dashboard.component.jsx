import React from "react";
import Charts from "../../Charts/Charts.component";
import Projects from "../../projects/Projects.component";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Projects />
      <Charts />
    </div>
  );
}

export default Dashboard;
