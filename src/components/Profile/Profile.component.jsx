import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/userSlice";
import {
  editUserDetails,
  setUserImage,
  signOutUser,
} from "../../Firebase/firebase";
import { toastStyle, toastStyleError } from "../../utils/Global";
import ProfilePicture from "../ProfilePicture/ProfilePicture.component";
import Button from "../ui/button/Button.component";
import styles from "./Profile.module.scss";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const nameRef = useRef(user?.name);
  const surnameRef = useRef(user?.surname);
  const emailRef = useRef(user?.email);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const storage = getStorage();

  async function updateUserDetails(e) {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const surname = surnameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    try {
      if (name.length < 1 || surname.length < 1 || email.length < 1) {
        throw new Error("Please fill out all fields");
      }

      if (
        name === user.name &&
        surname === user.surname &&
        email === user.email
      ) {
        toast(`Nothing to update`, {
          duration: 4000,
          style: toastStyle,
        });
        return;
      }

      const userData = {
        name,
        surname,
        email,
        fullName: `${name} ${surname}`,
      };

      await editUserDetails(user.uid, userData);
      toast(
        `Profile Updated Successfully. Please sign in again for changes to take effect`,
        {
          duration: 4000,
          style: toastStyle,
        }
      );

      await signOutUser();
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 4000,
        style: toastStyleError,
      });
    }
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files);
    setIsFilePicked(true);
  };

  const handleSubmission = async (event) => {
    event.preventDefault();

    try {
      if (!selectedFile) {
        throw new Error("No image selected");
      }
      if (!selectedFile?.type?.includes("image")) {
        throw new Error("Icorrect file type. Must be .png or .jpg");
      }
      if (selectedFile?.size > 2000000) {
        throw new Error("Uploaded image must be smaller than 2Mb.");
      }
      const fileType = selectedFile.name.split(".").pop();
      const uploadImageRef = ref(
        storage,
        `/images/${user.uid}/${user.uid}.${fileType}`
      );
      await uploadBytes(uploadImageRef, selectedFile);
      await setUserImage(
        user.uid,
        `/images/${user.uid}/${user.uid}.${fileType}`
      );
    } catch (e) {
      toast(`⚠ ${e.message}`, {
        duration: 4000,
        style: toastStyleError,
      });
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__info}>
        <div className={styles.profile__picture}>
          <ProfilePicture />
        </div>

        <form className={styles.upload}>
          <input type="file" id="fileUpload" onChange={changeHandler} />
          <Button onClick={handleSubmission}>Upload Profile Picture</Button>
        </form>
      </div>
      <form onSubmit={updateUserDetails}>
        <div className={styles.flex}>
          <div className={styles.input}>
            <label htmlFor="name">FIRST NAME</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              defaultValue={user?.name}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="surname">LAST NAME</label>
            <input
              type="text"
              id="surname"
              ref={surnameRef}
              defaultValue={user?.surname}
            />
          </div>
        </div>
        <div className={styles.input}>
          <label htmlFor="email">EMAIL</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            defaultValue={user?.email}
          />
        </div>

        <Button>Update</Button>
      </form>
    </div>
  );
}

export default Profile;
