import React from "react";
import Question from "./Question";
import Answer from "./Answer";

function Container(props) {
  return (
    <div className="container">
      <Question
        question={props.data.question}
        questionNumber={props.questionNumber}
      />

      <div className="answers">
        <Answer
          correct={props.data.correct_answer}
          incorrect={props.data.incorrect_answers}
          score={props.score}
          next={props.next}
        />
      </div>
    </div>
  );
}

export default Container;
