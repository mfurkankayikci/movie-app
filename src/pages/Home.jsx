import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies } from "../features/movieSlice";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, isLoading, currentPage } = useSelector(
    (state) => state.movies
  );

  const [searchTerm, setSearchTerm] = useState("Pokemon");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(fetchMovies({ searchTerm, page: currentPage, year, type }));
  }, []);

  const handleSearchTerm = (value) => {
    setSearchTerm(value === "" ? "Pokemon" : value);
  };

  const handleFilters = () => {
    dispatch(fetchMovies({ searchTerm, page: 1, year, type }));
  };

  const getDropList = () => {
    const year = new Date().getFullYear();
    return Array.from(new Array(50), (v, i) => (
      <option key={i} value={year - i}>
        {year - i}
      </option>
    ));
  };

  return (
    <>
      <section className="section section-filter-bar">
        <div className="container h-100">
          <div className="filter-form">
            <h1 className="section-title">{`Search Movie's`}</h1>

            <div className="filter-container">
              <div className="form-group">
                <label htmlFor="search">Search</label>
                <input
                  type="text"
                  className="form-control form-search-input"
                  value={searchTerm}
                  name="search"
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  placeholder="Search for a movie..."
                />
              </div>

              <div className="d-flex align-items-end gap-2">
                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <select
                    className="form-control"
                    value={year}
                    name="year"
                    placeholder="Year"
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">All</option>
                    {getDropList()}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select
                    className="form-control"
                    value={type}
                    name="type"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="movie">Movies</option>
                    <option value="series">TV Series</option>
                    <option value="episode">Episodes</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary rounded-0"
                  onClick={handleFilters}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <h3 className="mb-2">Search Result</h3>
        {isLoading === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>IMDb ID</th>
                </tr>
              </thead>
              <tbody>
                {movies &&
                  movies.map((movie) => (
                    <tr key={movie.imdbID}>
                      <td>
                        <Link
                          to={`/details/${movie.imdbID}`}
                          className="router-link"
                        >
                          {movie.Title}
                        </Link>
                      </td>
                      <td>{movie.Year}</td>
                      <td>{movie.imdbID}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Pagination />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
