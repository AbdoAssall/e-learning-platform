import React from 'react';
import { IoIosArrowDropleft } from "react-icons/io";

const Pagination = ({ examsPerPage, totalExams, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalExams / examsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav aria-label="Page navigation" className='mb-3'>
      <ul className="pagination justify-content-end mt-2 mb-3">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
            <span aria-hidden="true" className="arrow"><IoIosArrowDropleft className='icon' /></span>
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>

        ))}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <button className="page-link" aria-label="Next" onClick={() => paginate(currentPage + 1)}>
            <span aria-hidden="true" className="arrow arrow-right"><IoIosArrowDropleft className='icon' /></span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;