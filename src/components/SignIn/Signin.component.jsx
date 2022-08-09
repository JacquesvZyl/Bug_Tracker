import React, { useRef, useState } from "react";
import { signInWithEmailAndPw } from "../../Firebase/firebase";
import { toastStyleError } from "../../utils/Global";
import ButtonWithSpinner from "../ui/buttonWithSpinner/ButtonWithSpinner.component";
import styles from "./Signin.module.scss";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPw(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
    setLoading(false);
  };
  const demoSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPw("demo@user.com", "1234567");
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
    setLoading(false);
  };
  return (
    <form className={styles.login__form}>
      <h2>Sign In</h2>

      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <ButtonWithSpinner isLoading={isLoading} onClick={signIn}>
        Sign In
      </ButtonWithSpinner>
      <span className={styles.or}>OR</span>
      <ButtonWithSpinner isLoading={isLoading} onClick={demoSignIn}>
        Sign In with Demo Account
      </ButtonWithSpinner>

      <span className={styles.forgot_password__container}>
        <Link className={styles.forgot_password} to="/forgot-password">
          Forgot password?
        </Link>
      </span>
    </form>
  );
}

export default Signin;
