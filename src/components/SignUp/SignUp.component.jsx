import React, { useRef, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  db,
} from "../../Firebase/firebase";
import { toastStyleError } from "../../utils/Global";
import ButtonWithSpinner from "../ui/buttonWithSpinner/ButtonWithSpinner.component";
import styles from "./SignUp.module.scss";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
function SignUp() {
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const signUpUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = nameRef.current.value.trim();
    const surname = surnameRef.current.value.trim();
    try {
      if (passwordRef.current.value !== confirmPasswordRef.current.value)
        throw new Error("Passwords do not match");
      if (name.trim().length === 0 || surname.trim().length === 0)
        throw new Error("Please add a Name and Surname");

      const resp = await createAuthUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );

      await setDoc(doc(db, "users", resp.user.uid), {
        email: resp.user.email,
        name,
        surname,
        fullName: `${name} ${surname}`,
        profilePicture: "images/defaultProfile.png",
        role: {
          admin: false,
          developer: false,
          submitter: false,
          readOnly: true,
        },
      });
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
      <h2>Sign Up</h2>

      <div className={styles.name}>
        <input ref={nameRef} type="text" placeholder="First Name" />
        <input ref={surnameRef} type="text" placeholder="Last Name" />
      </div>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input
        ref={confirmPasswordRef}
        type="password"
        placeholder=" Confirm Password"
      />
      <ButtonWithSpinner isLoading={isLoading} onClick={signUpUser}>
        Create Account
      </ButtonWithSpinner>
    </form>
  );
}

export default SignUp;
