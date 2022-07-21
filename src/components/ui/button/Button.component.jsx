import React from "react";
import styles from "./Button.module.scss";

function Button({ children, disabled = false, ...other }) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${disabled && styles.disabled}`}
      {...other}
    >
      {children}
    </button>
  );
}

export default Button;
