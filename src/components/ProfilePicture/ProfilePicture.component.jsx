import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import toast from "react-hot-toast";
import { toastStyleError } from "../../utils/Global";
import styles from "./ProfilePicture.module.scss";
import Spinner from "../ui/Spinner/Spinner.component";

function ProfilePicture({ profileImage, border = null }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!profileImage) return;
    async function getImage() {
      try {
        setDisabled(true);
        const storage = getStorage();
        const reference = ref(storage, profileImage);
        const url = await getDownloadURL(reference);
        setImageUrl(url);
      } catch (e) {
        console.log(e);
        toast(`⚠ ${e.message}`, {
          duration: 4000,
          style: toastStyleError,
        });
      }
      setDisabled(false);
    }
    getImage();
  }, [profileImage]);

  return (
    <>
      {disabled ? (
        <Spinner />
      ) : (
        <img
          src={imageUrl}
          className={styles.image}
          alt="profile picture"
          style={border && { border: `5px solid ${border}` }}
        />
      )}
    </>
  );
}

export default ProfilePicture;
