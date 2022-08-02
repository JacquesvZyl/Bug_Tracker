import React, { useState } from "react";
import Modal from "../modal/Modal.component";
import styles from "./ProfilePopup.module.scss";
import * as ReactDOM from "react-dom";
import ProfilePicture from "../../ProfilePicture/ProfilePicture.component";
const rootElement = document.getElementById("modal-root");

function ProfilePopup({ onClickHandler, userData }) {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.background} />
        <div className={styles.header}>
          <span className={styles.close} onClick={onClickHandler}>
            &#10006;
          </span>
        </div>
        <div className={styles.profile__data}>
          <div className={styles.profile__image}>
            <ProfilePicture
              profileImage={userData?.profilePicture}
              border="white"
            />
          </div>
          <div className={styles.profile__text}>
            <div className={styles.name}>
              <p>{userData?.fullName}</p>
            </div>
            <div className={styles.user__data}>
              <div className={styles.text__wrapper}>
                <h5>Email:</h5>
                <p>{userData?.email}</p>
              </div>
              <div className={styles.text__wrapper}>
                <h5>Role:</h5>
                <p>
                  {Object.keys(userData?.role).find(
                    (key) => userData?.role[key] === true
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal onClick={onClickHandler} />
    </div>,
    rootElement
  );
}

export default ProfilePopup;
