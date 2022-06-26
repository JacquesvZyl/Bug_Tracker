import React from "react";
import styles from "./Login.module.scss";

function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.background} />
      <div className={styles.text}>
        <h1>Bug Tracker</h1>
        <span>Login or Register</span>
      </div>
    </div>
  );
}

export default Login;
