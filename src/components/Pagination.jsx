import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setPage } from "../features/movieSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.movies);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    dispatch(fetchMovies({ page }));
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {[...Array(5)].map((_, index) => {
          const page = index + 1;
          return (
            <li
              key={page}
              className={`page-item ${currentPage === page && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
