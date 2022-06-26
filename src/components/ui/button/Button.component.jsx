import React from "react";
import styles from "./Button.module.scss";

function Button({ children, ...other }) {
  return (
    <button className={styles.button} {...other}>
      {children}
    </button>
  );
}

export default Button;
