import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  movieId: string;
  release_date: string;
  average_rating: Number;
}

function MovieCard({ name, movieId, release_date, average_rating }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="py-3 px-5 bg-purple-200 cursor-pointer"
      onClick={() => {
        navigate("/details", { state: { movieId, name, average_rating } });
      }}
    >
      <h3 className="my-6 tracking-wide text-3xl">{name}</h3>
      <h3 className="my-6 italic tracking-tight text-3xl">
        Released : {release_date}
      </h3>
      <h3 className="my-6 font-bold text-3xl">
        Rating: {average_rating != null && average_rating.toString()}/10
      </h3>
    </div>
  );
}

export default MovieCard;
