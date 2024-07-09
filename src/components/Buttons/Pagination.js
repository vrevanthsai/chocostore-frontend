import React from 'react'
import "../../index.css"

const Pagination = ({ page,setPage,total,perPage }) => {
    // 2 is value of perPAge at (total/perPage) in BE
    // const perPage =perPage
    const totalPages = Math.ceil(total / perPage);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(page - 1, 1);
    let endPage = Math.min(startPage + 2, totalPages);

    if (endPage - startPage < 2) {
      startPage = Math.max(endPage - 2, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={page === i ? "pagination__selected" : ""}
          onClick={() => selectPageHandler(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
        {total > perPage && (
            <div className="pagination">
              {page > 1 && (
                <span onClick={() => selectPageHandler(1)}>Reset</span>
              )}

              {page > 1 && (
                <span onClick={() => selectPageHandler(page - 1)}>Prev</span>
              )}

              {/* Logic for displaying 3 consecutive page numbers */}
              {renderPageNumbers()}

              {page < totalPages && (
                <span onClick={() => selectPageHandler(page + 1)}>Next</span>
              )}
            </div>
          )}
    </div>
  )
}

export default Pagination