import React from "react";
import { decode } from "html-entities";

function Question(props) {
  const decoded = decode(props.question);
  return (
    <h3>
      {props.questionNumber + 1}. {decoded}
    </h3>
  );
}

export default Question;
