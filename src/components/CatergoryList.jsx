import React from "react";

function CategoryList(props) {
  const displayList = () => {
    return props.list.map((item, key) => {
      return (
        <option value={key} key={key}>
          {item.name}
        </option>
      );
    });
  };

  return (
    <select
      onChange={(e) => {
        props.start(Number(e.target.value));
      }}
    >
      {displayList()}
    </select>
  );
}

export default CategoryList;
