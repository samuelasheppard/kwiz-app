import "./App.css";
import React, { useState, useEffect } from "react";
import Container from "./components/Container";
import axios from "axios";
import CurrentScore from "./components/CurrentScore";
import HighScore from "./components/HighScore";
import CategoryList from "./components/CatergoryList";
import Results from "./components/Results";
import "./App.css";
import GameLength from "./components/GameLength";

function App() {
  // question data and current question number
  const [state, setState] = useState({
    questions: [],
    questionNumber: 0,
    categories: [
      { name: "Any" },
      { name: "General Knowledge", api: "9" },
      { name: "Books", api: "10" },
      { name: "Film", api: "11" },
      { name: "Music", api: "12" },
      { name: "Musicals and Theatre", api: "13" },
      { name: "Television", api: "14" },
      { name: "Video Games", api: "15" },
      { name: "Board Games", api: "16" },
      { name: "Science", api: "17" },
      { name: "Computer Science", api: "18" },
      { name: "Maths", api: "19" },
      { name: "Mythology", api: "20" },
      { name: "Sports", api: "21" },
      { name: "Geography", api: "22" },
      { name: "History", api: "23" },
      { name: "Politics", api: "24" },
      { name: "Art", api: "25" },
      { name: "Celebrities", api: "26" },
      { name: "Animals", api: "27" },
      { name: "Vehicles", api: "28" },
      { name: "Comicbooks", api: "29" },
      { name: "Gadgets", api: "30" },
      { name: "Anime", api: "31" },
      { name: "Cartoons", api: "32" },
    ],
    currentCat: 0,
    score: 0,
    highScore: 0,
    length: 10,
  });

  useEffect(() => {
    if (state.questionNumber >= state.questions.length) {
      changeHighscore(state.currentCat);
    }
  }, [state]);

  //api call
  const getQuestions = async (category) => {
    const categoryString =
      category !== undefined ? "&category=" + category : "";
    try {
      const url = `https://opentdb.com/api.php?amount=${state.length}${categoryString}`;
      const data = await axios.get(url);
      return data.data.results;
    } catch (error) {
      console.log(error);
    }
  };

  //utility methods
  const getHighscore = (category) => {
    const storedScore = window.localStorage.getItem(
      `Category ${category} Length ${state.length}`
    )
      ? window.localStorage.getItem(
          `Category ${category} Length ${state.length}`
        )
      : window.localStorage.setItem(
          `Category ${category} Length ${state.length}`,
          0
        );
    const number = Number(storedScore);
    return number || 0;
  };

  const changeHighscore = (category) => {
    if (state.score > state.highScore) {
      window.localStorage.setItem(
        `Category ${category} Length ${state.length}`,
        state.score.toString()
      );
      setState({ ...state, highScore: state.score });
    }
  };

  const setLength = (e) => {
    setState({ ...state, length: e.target.value });
  };

  const addScore = () => {
    setState({
      ...state,
      score: state.score++,
    });
  };

  const nextQuestion = () => {
    setState({
      ...state,
      questionNumber: state.questionNumber + 1,
    });
  };

  const start = async (category) => {
    const result = await getQuestions(state.categories[category].api);
    setState({
      ...state,
      score: 0,
      questionNumber: 0,
      currentCat: category,
      highScore: getHighscore(category),
      questions: result,
    });
  };

  return (
    <div className="app">
      <header>
        <h1>kwiz</h1>
        <small>(A quiz game)</small>
      </header>
      <div
        className={
          state.questionNumber >= state.questions.length ? "menu" : "hide"
        }
      >
        <h2>Select the length of game:</h2>
        <GameLength setLength={setLength} />
        <h2>Select a category to start:</h2>
        <CategoryList list={state.categories} start={start} />
        {state.questions.length > 0 && (
          <p>
            Category selected:{" "}
            <span>{state.categories[state.currentCat].name}</span>
          </p>
        )}
      </div>
      <div className="scores">
        {state.questions && (
          <CurrentScore score={state.score} length={state.length} />
        )}
        <HighScore highscore={state.highScore} length={state.length} />
      </div>
      {state.questionNumber < state.questions.length && (
        <Container
          data={state.questions[state.questionNumber]}
          showCorrect={state.showCorrect}
          score={addScore}
          next={nextQuestion}
          questionNumber={state.questionNumber}
        />
      )}
      <div className="replayLastQuestion">
        {state.questionNumber > 0 && (
          <Results data={state.questions[state.questionNumber - 1]} />
        )}
        {state.questionNumber !== 0 &&
          state.questionNumber === state.questions.length && (
            <button
              onClick={() => {
                start(state.currentCat);
              }}
            >
              Replay previous category
            </button>
          )}
      </div>
    </div>
  );
}

export default App;
