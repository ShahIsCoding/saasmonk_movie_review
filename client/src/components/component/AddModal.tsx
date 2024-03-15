import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieApi, reviewApi } from "../service/api";
import { formatDate } from "../utils/dateUtils";

type Unit = "movie" | "review" | null;

interface MovieModalProps {
  modal: Unit;
  setModal: Function;
}

const AddModal = ({ modal, setModal }: MovieModalProps) => {
  const [name, setName] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [movieId, setMovieId] = useState<string>("");
  const [movies, setMovies] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    movieApi.getAllMovies((resp) => setMovies(resp.data));
  }, []);
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleMoviesChange = (e: any) => {
    console.log(e.target.value);

    setMovieId(e.target.value);
  };
  const handleReleaseDateChange = (e: any) => {
    let val = e.target.value;
    setReleaseDate(val);
  };

  const handleRatingChange = (e: any) => {
    setRating(e.target.value);
  };

  const handleCommentsChange = (e: any) => {
    setComments(e.target.value);
  };
  const handleSubmit = (e: any) => {
    if (modal === "movie") {
      let payload = {
        name,
        release_date: formatDate(releaseDate),
      };
      movieApi.createMovie(payload, (resp) => console.log(resp));
    }
    if (modal === "review") {
      let payload = {
        movie: movieId,
        reviewer_name: name,
        rating: rating,
        comment: comments,
      };
      reviewApi.createReview(payload, (resp) => console.log(resp));
    }
    setModal(null);
    navigate("/");
  };
  const renderModalContent = () => {
    switch (modal) {
      case "movie":
        return (
          <div className="flex flex-col py-5 px-5 gap-5 ">
            <h2 className="font-semibold text-xl">Add new movie</h2>
            <input
              className="border p-3 "
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <input
              className="border p-3"
              type="date"
              placeholder="Release Date"
              value={releaseDate}
              onChange={handleReleaseDateChange}
            />
            <button
              className="bg-indigo-600 text-white rounded px-3 py-2 w-fit ml-auto"
              onClick={handleSubmit}
            >
              Create movie
            </button>
          </div>
        );
      case "review":
        return (
          <div className="flex flex-col py-5 px-5 gap-5 ">
            <h2 className="font-semibold text-xl">Add new review</h2>
            <select
              onChange={handleMoviesChange}
              value={movieId}
              className="border p-3"
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option value={movie._id}>{movie.name}</option>
              ))}
            </select>
            <input
              className="border p-3 "
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <input
              className="border p-3"
              type="number"
              max={10}
              placeholder="Rating out of 10"
              value={rating}
              onChange={handleRatingChange}
            />
            <textarea
              className="border p-3"
              placeholder="Review comments"
              value={comments}
              onChange={handleCommentsChange}
            ></textarea>
            <button
              className="bg-indigo-600 text-white rounded px-3 py-2 w-fit ml-auto"
              onClick={handleSubmit}
            >
              Add review
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
      <div className="w-80 border">
        <div
          className="px-5 ml-auto w-fit text-indigo-600 cursor-pointer border-0"
          onClick={() => setModal(null)}
        >
          X
        </div>

        {renderModalContent()}
      </div>
    </div>
  );
};

export default AddModal;
