import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Review from "../pages/Review";
import { useState } from "react";
import React from "react";
type Unit = "movie" | "review" | null;
interface main {
  modal: Unit;
}
const Main = ({ modal }: main) => {
  return (
    <Routes>
      <Route path="" element={<Home modal={modal} />} />
      <Route path="/details" element={<Review modal={modal} />} />
    </Routes>
  );
};

export default Main;
