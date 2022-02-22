import React from "react";

function HighScore(props) {
  return (
    <p>
      Your Highscore: <span>{props.highscore}</span> / {props.length}
    </p>
  );
}

export default HighScore;
