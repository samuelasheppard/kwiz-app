import React from "react";

function CurrentScore(props) {
  return (
    <p>
      Current score: <span>{props.score}</span> / {props.length}
    </p>
  );
}

export default CurrentScore;
