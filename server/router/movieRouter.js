const express = require("express");
const movieSchema = require("../model/movieSchema");
const { handleError } = require("../utils/error");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const movie = await movieSchema.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const movies = await movieSchema.find();
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await movieSchema.findById(req.params.id);
    if (!movie) {
      next(handleError(404, "Movie not found"));
    }
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const movie = await movieSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return next(handleError(404, "Movie not found"));
    }
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const movie = await movieSchema.findByIdAndDelete(req.params.id);
    if (!movie) {
      return next(handleError(404, "Movie not found"));
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
