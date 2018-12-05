import React from "react";
import "./peopleList.css";

const PeopleList = ({ taskList }) => {
  // to create a new array from properties of an array of objects  https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  let peopleList = taskList.map(task => task.assignee);

  // to make a new array from all unique values from an array
  let uniquePeopleList = [...new Set(peopleList)];

  return (
    <div className="people-list-section">
      <h6>PEOPLE</h6>
      <ul className="people-list">
        {uniquePeopleList.map(people => (
          <li key={people} className="people-list-item">
            @{people}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
