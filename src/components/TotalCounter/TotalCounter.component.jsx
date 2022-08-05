import React from "react";
import styles from "./TotalCounter.module.scss";

function TotalCounter({ data }) {
  return (
    <div className={styles.total__container}>
      <div className={styles.total}>
        <span>Total:</span>
        <span>{data?.length}</span>
      </div>
    </div>
  );
}

export default TotalCounter;
