import React from "react";
import "./Item.css";

const Item = props => {
  return (
    <div className="item">
      <img
        src="https://whatsnewinfitness.com.au/wp-content/uploads/Wexer-Virtual-Class-Timetable.jpg"
        width="150"
        alt=""
      />
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p>{props.price}</p>
      <input
        type="checkbox"
        onChange={props.onSelect}
        disabled={props.disabled}
        checked={props.selected}
      />
    </div>
  );
};

export default Item;
