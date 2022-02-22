import React, { Component } from "react";

function GameLength(props) {
  const options = [10, 20, 30, 40, 50];
  const showOptions = () => {
    return options.map((item) => {
      return (
        <option value={item} key={item}>
          {item}
        </option>
      );
    });
  };
  return (
    <select
      onChange={(e) => {
        props.setLength(e);
      }}
    >
      {showOptions()}
    </select>
  );
}

export default GameLength;

// <>
//   <input
//     type="number"
//     required
//     min="10"
//     max="50"
//     onChange={(e) => {
//       props.setLength(e);
//     }}
//   />
// </>
