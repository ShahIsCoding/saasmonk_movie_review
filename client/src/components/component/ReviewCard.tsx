import React from "react";

type Props = {
  comment: string;
  rating: Number;
  reviewer_name: string;
};

function ReviewCard({ comment, rating, reviewer_name }: Props) {
  return (
    <div className="px-10 py-5 border">
      <div className="flex flex-row justify-between mb-5">
        <h2>{comment}</h2>
        <h1 className="text-indigo-600 text-2xl">
          {rating && rating.toString()}/10
        </h1>
      </div>
      <h2 className="italic font-bold">By {reviewer_name}</h2>
    </div>
  );
}

export default ReviewCard;
