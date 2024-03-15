import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Review from "../pages/Review";
import { useState } from "react";
import React from "react";

const Main = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/details" element={<Review />} />
    </Routes>
  );
};

export default Main;
