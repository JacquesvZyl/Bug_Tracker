import React, { useState } from "react";
import { TbFilterOff } from "react-icons/tb";
import { TbFilter } from "react-icons/tb";
import { useSelector } from "react-redux";
import FilterDropdown from "../FilterDropdown/FilterDropdown.component";
import styles from "./Filter.module.scss";

function Filter() {
  const filterState = useSelector((state) => state.projects.filter);
  const [showOptions, setOptions] = useState(false);
  const isFiltered = filterState.priority !== "" || filterState.status !== "";

  function showOptionsHandler() {
    setOptions((prevVal) => !prevVal);
  }
  return (
    <div className={styles.filter}>
      {isFiltered ? (
        <TbFilter onClick={showOptionsHandler} />
      ) : (
        <TbFilterOff onClick={showOptionsHandler} />
      )}

      {showOptions && <FilterDropdown onClickHandler={showOptionsHandler} />}
    </div>
  );
}

export default Filter;
