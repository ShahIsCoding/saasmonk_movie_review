import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

export const movieApi = {
  createMovie: (payload, onSuccess, onError) => {
    api
      .post("/movie", payload)
      .then((resp) => onSuccess && onSuccess(resp))
      .catch((err) => onError && onError(err));
  },
  getAllMovies: (onSuccess, onError) => {
    api
      .get("/movie")
      .then((resp) => onSuccess && onSuccess(resp))
      .catch((err) => onError && onError(err));
  },
};

export const reviewApi = {
  createReview: (payload, onSuccess, onError) => {
    api
      .post("/review", payload)
      .then((resp) => onSuccess && onSuccess(resp))
      .catch((err) => onError && onError(err));
  },
  getReview: (payload, onSuccess, onError) => {
    api
      .get(`/review/movie/${payload}`)
      .then((resp) => onSuccess && onSuccess(resp))
      .catch((err) => onError && onError(err));
  },
  searchMovie: (payload, onSuccess, onError) => {
    api
      .get(`/review/search/${payload.keyword}`)
      .then((resp) => onSuccess && onSuccess(resp))
      .catch((err) => onError && onError(err));
  },
};
