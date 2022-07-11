import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Paginate.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Paginate({ data, itemsPerPage, setCurrentItems }) {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!data) return;
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
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
    </>
  );
}

export default Paginate;
