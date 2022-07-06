import React from "react";
import styles from "./TableHeader.module.scss";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function TableHeader({
  children,
  type,
  state,
  setState,
  ticketState,
  setTicketState,
}) {
  function onClickHandler() {
    let sortedData;
    const arrayForSort = [...ticketState];
    if (!state[type] || state[type] === "DSC") {
      setState({
        [type]: "ASC",
      });
      sortedData = arrayForSort.sort((a, b) =>
        a[type]?.toLowerCase() > b[type]?.toLowerCase() ? 1 : -1
      );
    } else {
      setState({
        [type]: "DSC",
      });
      sortedData = arrayForSort.sort((a, b) =>
        a[type]?.toLowerCase() > b[type]?.toLowerCase() ? -1 : 1
      );
    }

    setTicketState((prevVal) => sortedData);
  }

  return (
    <th onClick={onClickHandler}>
      {!state[type] ? (
        <FaSort className={styles.img__gray} />
      ) : state[type] === "ASC" ? (
        <FaSortUp />
      ) : (
        <FaSortDown />
      )}
      {children}
    </th>
  );
}

export default TableHeader;