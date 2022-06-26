import React from "react";
import * as ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
const rootElement = document.getElementById("modal-root");

function Modal({ children, ...rest }) {
  return ReactDOM.createPortal(
    <div className={styles.modal} {...rest}>
      {children}
    </div>,
    rootElement
  );
}

export default Modal;
