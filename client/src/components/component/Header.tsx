import React from "react";
import { useNavigate } from "react-router-dom";
interface header {
  setModal: Function;
}
const Header = ({ setModal }: header) => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-200 w-100 px-5 py-3 flex justify-between items-center">
      <h2
        onClick={() => {
          navigate("");
        }}
      >
        MOVIECRITIC
      </h2>
      <div className="gap-2 flex flex-row">
        <button
          className="border border-indigo-600 text-indigo-600 bg-white rounded px-3 py-2"
          onClick={() => setModal("movie")}
        >
          Add new movie
        </button>
        <button
          className="bg-indigo-600 text-white rounded px-3 py-2"
          onClick={() => setModal("review")}
        >
          Add new review
        </button>
      </div>
    </div>
  );
};

export default Header;
