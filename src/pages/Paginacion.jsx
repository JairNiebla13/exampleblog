import React, { useEffect, useState } from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

function Paginacion({ totalPosts, currentPage, setCurrentPage, postsPerPage }) {
  const pageNumbers = [];

  // Calcular el numero de paginas
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //Retroceder una pagina
  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //Avanzar una pagina
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  //Posicionarse en una pagina
  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <nav
      className="pagination is-centered custom-pagination"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className={`pagination-previous ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        <SkipPreviousIcon />
      </button>
      <ul className="pagination-list custom-pagination-list">
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <a
              className={`pagination-link ${
                noPage === currentPage ? "is-current" : ""
              }`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`pagination-next ${
          currentPage === pageNumbers.length ? "disabled" : ""
        }`}
        onClick={onNextPage}
        disabled={currentPage === pageNumbers.length}
      >
        <SkipNextIcon />
      </button>
    </nav>
  );
}

export default Paginacion;
