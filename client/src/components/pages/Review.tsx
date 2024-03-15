import React, { useEffect, useState } from "react";
import ReviewCard from "../component/ReviewCard";
import { reviewApi } from "../service/api";
import { useLocation } from "react-router-dom";
type Unit = "movie" | "review" | null;
interface review {
  modal: Unit;
}
const Review = ({ modal }: review) => {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  let { movieId, name, average_rating } = location.state;
  useEffect(() => {
    movieId !== null &&
      reviewApi.getReview(movieId, (resp) => setReviews(resp.data));
  }, [modal]);
  return (
    <div className="p-5">
      <div className=" flex flex-row items-center justify-between w-100 mb-5">
        <h1 className="my-5 text-4xl text-nowrap">{name}</h1>
        <h1 className="text-4xl text-indigo-600">
          {average_rating && average_rating.toString()}/10
        </h1>
      </div>
      <div className="flex flex-col gap-10">
        {reviews.map(({ comment, rating, reviewer_name }, idx) => (
          <ReviewCard
            comment={comment}
            rating={rating}
            reviewer_name={reviewer_name}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
