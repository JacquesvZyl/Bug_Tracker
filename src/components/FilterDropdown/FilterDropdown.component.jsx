import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../app/projectDataSlice";
import Modal from "../popups/modal/Modal.component";
import Button from "../ui/button/Button.component";
import styles from "./FilterDropdown.module.scss";

function FilterDropdown({ onClickHandler }) {
  const filterState = useSelector((state) => state.projects.filter);
  const priorityRef = useRef(filterState.priority);
  const statusRef = useRef(filterState.status);
  const typeRef = useRef(filterState.type);
  const dispatch = useDispatch();
  function filterHandler() {
    const filterData = {
      priority: priorityRef.current.value,
      status: statusRef.current.value,
      type: typeRef.current.value,
    };
    dispatch(setFilter(filterData));
    onClickHandler();
  }
  return (
    <div className={styles.dropdown}>
      <p>Filter by:</p>
      <div className={styles.select}>
        <label htmlFor="priority">Priority</label>
        <select
          name="priority"
          id="priority"
          ref={priorityRef}
          defaultValue={filterState?.priority}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div className={styles.select}>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          ref={statusRef}
          defaultValue={filterState?.status}
        >
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <div className={styles.select}>
        <label htmlFor="type">Type</label>
        <select
          name="type"
          id="type"
          ref={typeRef}
          defaultValue={filterState?.type}
        >
          <option value="">All</option>
          <option value="issue">Issue</option>
          <option value="bug">Bug</option>
          <option value="feature request">Feature Request</option>
        </select>
      </div>
      <Button onClick={filterHandler}>Apply</Button>
      <Modal
        onClick={onClickHandler}
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      />
    </div>
  );
}

export default FilterDropdown;
