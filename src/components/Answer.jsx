import React from "react";
import { decode } from "html-entities";

function Answer(props) {
  //combine, filter out duplicates and randomise answers
  const { incorrect, correct } = props;
  const filtered = incorrect.filter((word) => word !== correct);
  filtered.push(correct);
  filtered.sort(() => 0.5 - Math.random());

  const displayAnswers = (array) => {
    return array.map((item, index) => {
      const decoded = decode(item);
      return (
        <button
          key={index}
          onClick={() => {
            if (item === correct) {
              props.score();
              props.next();
            } else {
              props.next();
            }
          }}
        >
          {decoded}
        </button>
      );
    });
  };

  return <>{displayAnswers(filtered)}</>;
}

export default Answer;
