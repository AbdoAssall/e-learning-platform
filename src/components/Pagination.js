import React from 'react';
import { IoIosArrowDropleft } from "react-icons/io";

const Pagination = () => {
  return (
    <nav aria-label="Page navigation" className='mb-3'>
      <ul className="pagination justify-content-end mt-2 mb-3">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true" className="arrow"><IoIosArrowDropleft className='icon' /></span>
          </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">...</a></li>
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true" className="arrow arrow-right"><IoIosArrowDropleft className='icon' /></span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;