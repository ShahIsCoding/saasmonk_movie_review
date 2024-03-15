const mongoose = require("mongoose");
const { MOVIE } = require("../constants");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");
const movieSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => MOVIE + ":" + uuidv4(),
      unique: true,
    },
    name: {
      type: String,
    },
    release_date: {
      type: String,
    },
    average_rating: {
      type: Number,
      default: null,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

module.exports = mongoose.model("movie", movieSchema);
