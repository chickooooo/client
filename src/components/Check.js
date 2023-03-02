import React, { useState } from "react";
import Axios from "axios";
import "./Check.css";

function Check() {
  // text content
  const [text, setText] = useState("-");

  // make api request
  const fetchData = () => {
    Axios.get("https://jsonplaceholder.typicode.com/todos/1").then(
      (response) => {
        setText(response.data["title"]);
      }
    );
  };

  return (
    <div className="check">
      <h1>Hello World!</h1>
      <button type="button" onClick={fetchData}>
        Get data
      </button>
      <p>{text}</p>
    </div>
  );
}

export default Check;
