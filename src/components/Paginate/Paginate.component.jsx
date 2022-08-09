import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Paginate.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setPaginationCount } from "../../app/projectDataSlice";

function Paginate({ data, setCurrentItems }) {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = useSelector(
    (state) => state.projects.paginationPageCount
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || !itemsPerPage) return;
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data, setCurrentItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  function onChangeHandler(e) {
    const value = +e.target.value < 1 ? 1 : +e.target.value;

    dispatch(setPaginationCount(value));
  }

  return (
    <div className={styles.pagination__container}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaAngleRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<FaAngleLeft />}
        renderOnZeroPageCount={null}
        className={styles.pagination}
        activeClassName={styles.active}
      />
      <div className={styles.items_per_page}>
        <label htmlFor="pageAmount">Results per page</label>
        <input
          type="number"
          id="pageAmount"
          value={itemsPerPage}
          onChange={onChangeHandler}
          min="1"
          max="50"
        />
      </div>
    </div>
  );
}

export default Paginate;
