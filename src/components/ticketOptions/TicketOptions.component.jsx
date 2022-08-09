import React, { useState } from "react";
import styles from "./TicketOptions.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TicketDropdown from "../popups/TicketDropdown/TicketDropdown.component";
function TicketOptions({
  onClickDeleteHandler,
  onClickEditHandler,
  isTicket,
  userEditPermissions,
  userDeletePermissions,

  ...options
}) {
  const [showOptions, setOptions] = useState(false);

  function showOptionsHandler(e) {
    setOptions((prevVal) => !prevVal);
  }

  return (
    <td className={styles.options} {...options}>
      <MoreVertIcon
        onClick={showOptionsHandler}
        className={styles.more__icon}
      />
      {showOptions && (
        <TicketDropdown
          onClickHandler={showOptionsHandler}
          onClickDeleteHandler={onClickDeleteHandler}
          onClickEditHandler={onClickEditHandler}
          userEditPermissions={userEditPermissions}
          userDeletePermissions={userDeletePermissions}
          isTicket={isTicket}
        />
      )}
    </td>
  );
}

export default TicketOptions;
