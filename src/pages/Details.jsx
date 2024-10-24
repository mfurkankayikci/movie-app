import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../features/movieSlice";

const Details = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchMovies({ searchTerm: "", page: 1, year: "", type: "", id }));
  }, [dispatch, id]);

  return (
    <>
      <section className="section section-filter-bar">
        <div className="container h-100">
          <div className="filter-form justify-content-center">
            <h1 className="section-title">Movie Details</h1>
          </div>
        </div>
      </section>

      <section className="section section-movie-details py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3">
              <img className="w-100" src={movies[0]?.Poster} />
            </div>
            <div className="col-12 col-md-9">
              <h2>{movies[0]?.Title}</h2>
              <div className="d-flex gap-2 mb-4">
                <span className="badge text-bg-success">{movies[0]?.Year}</span>

                <span className="badge text-bg-warning">
                  {movies[0]?.imdbRating}/10
                </span>
                <span className="badge text-bg-danger">
                  {movies[0]?.Runtime}
                </span>
              </div>

              <hr />

              <p>{movies[0]?.Plot}</p>

              <p>
                <strong>Genre: </strong>
                {movies[0]?.Genre}
              </p>
              <p>
                <strong>Director: </strong>
                {movies[0]?.Director}
              </p>
              <p>
                <strong>Writer: </strong>
                {movies[0]?.Writer}
              </p>
              <p>
                <strong>Language: </strong>
                {movies[0]?.Language}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
