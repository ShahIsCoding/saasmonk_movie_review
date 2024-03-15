const mongoose = require("mongoose");
const { REVIEW } = require("../constants");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");
const reviewSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => REVIEW + ":" + uuidv4(),
      unique: true,
    },
    movie: {
      type: String,
      ref: "movie",
    },
    reviewer_name: {
      type: String,
    },
    rating: {
      type: Number,
      max: 10,
    },
    comment: {
      type: String,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

module.exports = mongoose.model("review", reviewSchema);
