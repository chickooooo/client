import React, { useState } from "react";
import MovieReview from "./contents/MovieReview";
import "./Skeleton.css";

function Skeleton() {
  const [active, setActive] = useState("movie-review");

  const changeContent = (e) => {
    setActive(e);
  };

  const getContent = () => {
    if (active === "movie-review") {
      return <MovieReview />;
    } else if (active === "toxic-comment") {
      return <p>not yet implemented</p>;
    } else {
      return <></>;
    }
  };

  return (
    <div className="skeleton">
      <button
        type="button"
        className="button-6"
        onClick={() => changeContent("movie-review")}
      >
        Movie Review
      </button>
      <button
        type="button"
        className="button-6"
        onClick={() => changeContent("toxic-comment")}
      >
        Toxic Comment
      </button>
      <div>{getContent()}</div>
    </div>
  );
}

export default Skeleton;
