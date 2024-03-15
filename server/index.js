const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const movieRouter = require("./router/movieRouter");
const reviewRouter = require("./router/reviewRouter");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/movie", movieRouter);
app.use("/review", reviewRouter);

app.get("/", (req, res) => {
  res.json({ ans: "SERVER IS RUNNING" });
});

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongoose connected`);
});

db.on("error", (err, next) => {
  console.error("Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({
    message: message,
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
