import React, { useState } from "react";
import Signin from "../../SignIn/Signin.component";
import SignUp from "../../SignUp/SignUp.component";
import styles from "./Login.module.scss";

function Login() {
  const [showSignup, setShowSignup] = useState(false);

  function onSignupChangeHandler() {
    setShowSignup((prevVal) => !prevVal);
  }
  return (
    <div className={styles.login}>
      <div className={styles.background} />
      <div className={styles.text}>
        <h1>Bug Tracker</h1>
        <span>Login or Register</span>
      </div>
      <div className={styles.login__screen}>
        {!showSignup ? <Signin /> : <SignUp />}
        <div className={styles.showSignupContainer}>
          <span className={styles.question}>
            {showSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <span className={styles.link} onClick={onSignupChangeHandler}>
            {showSignup ? "Sign In" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
