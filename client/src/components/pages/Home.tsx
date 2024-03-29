import React, { useEffect, useState } from "react";
import MovieCard from "../component/MovieCard";
import { movieApi, reviewApi } from "../service/api";
type Unit = "movie" | "review" | null;
interface home {
  modal: Unit;
}
const Home = ({ modal }: home) => {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (search === "") {
      movieApi.getAllMovies((resp) => setMovies(resp.data));
    } else {
      reviewApi.searchMovie(search, (resp) => setMovies(resp.data));
    }
  }, [search, modal]);
  return (
    <div className="p-5">
      <div className="w-1/5 h-1/5">
        <h1 className="my-5 text-4xl text-nowrap">
          The best movie review site !
        </h1>
        <div className="p-3 border border-indigo-600 my-5 rounded w-full flex items-center">
          <div className="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </div>
          <input
            className="flex-1 px-3 py-2 border-l rounded focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for your favourite movie"
          />
        </div>
      </div>
      <div className="h-3/5 overflow-auto">
        <div className="grid grid-cols-3 gap-10 ">
          {movies.length > 0 &&
            movies.map(({ name, _id, release_date, average_rating }, idx) => (
              <MovieCard
                movieId={_id}
                key={idx}
                name={name}
                average_rating={average_rating}
                release_date={release_date}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
