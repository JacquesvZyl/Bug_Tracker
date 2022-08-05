import React from "react";
import styles from "./Button.module.scss";

function Button({ children, className, disabled = false, ...other }) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${className} ${disabled && styles.disabled}`}
      {...other}
    >
      {children}
    </button>
  );
}

export default Button;
