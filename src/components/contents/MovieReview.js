import React, { useState } from "react";
import Axios from "axios";
import "./MovieReview.css";

function MovieReview() {
  // text content
  const [data, setData] = useState({ sentiment: "-", confidence: "-" });
  const [status, setStatus] = useState("idle");

  // make api request
  const fetchData = () => {
    setStatus("busy");
    setTimeout(function () {
      Axios.get("https://jsonplaceholder.typicode.com/todos/1").then(
        (response) => {
          setData({
            sentiment: response.data["title"],
            confidence: "0.56",
          });
          setStatus("idle");
        }
      );
    }, 2000);
  };

  const getButton = () => {
    if (status === "idle") {
      return (
        <button type="button" className="button-58" onClick={() => fetchData()}>
          Analyze
        </button>
      );
    } else {
      return (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
  };

  return (
    <div className="movie-review">
      <h2 className="title">Movie Review Sentiment Analysis</h2>
      <p className="subtitle">
        This is some description about the task that the model performs.
      </p>
      <div>
        <textarea placeholder="Add your review here"></textarea>
      </div>
      {getButton()}
      <div className="result">
        <div>
          <p>sentiment: {data.sentiment}</p>
        </div>
        <div>
          <p>confidence: {data.confidence}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieReview;
