import React from "react";
import "./Pagination.scss";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  onChange,
  previous,
  next,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <nav className="Pagination">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>

      <ul className="pagination-buttons">
        <li>
          <a onClick={() => previous()} href="!#">
            previous
          </a>
          {" / "}
          <a onClick={() => next()} href="!#">
            next
          </a>
        </li>
      </ul>

      <select name="pagination-list" onChange={handleChange}>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
      </select>
    </nav>
  );
};

export default Pagination;
