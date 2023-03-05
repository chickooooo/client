import React, { useState } from "react";
import Axios from "axios";
import "./MovieReview.css";

var text = "";

function MovieReview() {
  const [data, setData] = useState({ sentiment: "-", confidence: "-" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onTextChange = (e) => {
    text = e.target.value;
  };

  const validateText = () => {
    if (text.trim().length < 5) {
      setError("review is too short");
      return false;
    } else if (text.trim().length > 2000) {
      setError("review is too long");
      return false;
    }

    // removing new line
    text = text.replace(/(\r\n|\n|\r)/gm, " ");
    // removing leadign and trailing space
    text = text.trim();
    // removing double space
    while (text.includes("  ")) {
      text = text.replace("  ", " ");
    }

    console.log(text);
    return true;
  };

  const fetchData = () => {
    setError("");
    var result = validateText();

    if (result) {
      setStatus("busy");

      Axios.post("http://localhost:5000/api/movie_review", {
        text: text,
      })
        .then((response) => {
          setData({
            sentiment: response.data["message"],
            confidence: response.data["confidence"],
          });

          setStatus("idle");
        })
        .catch((e) => {
          setError("something went wrong");
          setStatus("idle");
        });
    }
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
        This NLP model analyzes whether the review sentiment is 'positive' or
        'negative'
      </p>
      <div>
        <textarea
          placeholder="Add your review here"
          onChange={onTextChange}
        ></textarea>
      </div>
      {error === "" ? <></> : <p className="error">{error}</p>}
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
