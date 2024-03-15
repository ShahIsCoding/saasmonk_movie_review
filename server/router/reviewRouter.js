const express = require("express");
const reviewSchema = require("../model/reviewSchema");
const { handleError } = require("../utils/error");
const movieSchema = require("../model/movieSchema");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const review = await reviewSchema.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const reviews = await reviewSchema.find().populate("movie");
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

router.get("/movie/:id", async (req, res, next) => {
  try {
    const review = await reviewSchema.find({ movie: req.params.id });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
});
router.get("/search/:keyword", async (req, res, next) => {
  const keyword = req.params.keyword;
  try {
    const reviews = await reviewSchema.find({
      comment: { $regex: keyword, $options: "i" },
    });
    const movieIds = reviews.map((review) => review.movie);
    const movies = await movieSchema.find({ _id: { $in: movieIds } });
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const review = await reviewSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!review) {
      return next(handleError(404), "Review not found");
    }
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const review = await reviewSchema.findByIdAndDelete(req.params.id);
    if (!review) {
      return next(handleError(404), "Review not found");
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
