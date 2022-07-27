import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import toast from "react-hot-toast";
import { toastStyleError } from "../../utils/Global";
import styles from "./ProfilePicture.module.scss";
import Spinner from "../ui/Spinner/Spinner.component";

function ProfilePicture({ profileImage = null }) {
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (profileImage) return;
    async function getImage() {
      try {
        setDisabled(true);
        const storage = getStorage();
        const reference = ref(storage, user.profilePicture);
        const url = await getDownloadURL(reference);
        console.log(url);
        setImageUrl(url);
      } catch (e) {
        toast(`⚠ ${e.message}`, {
          duration: 2000,
          style: toastStyleError,
        });
      }
      setDisabled(false);
    }
    getImage();
  }, [user.profilePicture]);

  return (
    <>
      {disabled ? (
        <Spinner />
      ) : (
        <img
          src={profileImage ? profileImage : imageUrl}
          className={styles.image}
          alt="profile picture"
        />
      )}
    </>
  );
}

export default ProfilePicture;
