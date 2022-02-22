import React from "react";
import { decode } from "html-entities";

function Results(props) {
  return (
    <div className="results">
      <p>Last question: {decode(props.data.question)}</p>
      <p>Answer: {decode(props.data.correct_answer)}</p>
    </div>
  );
}

export default Results;
