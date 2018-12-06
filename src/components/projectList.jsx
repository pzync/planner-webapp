import React from "react";
import "./projectList.css";

const ProjectList = ({ taskList }) => {
  // to create a new array from properties of an array of objects  https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  let projectList = taskList.map(task => task.project);

  // to make a new array from all unique values from an array
  let uniqueProjectList = [...new Set(projectList)];

  return (
    <div className="project-list-section">
      <h6>PROJECTS</h6>
      <ul className="project-list">
        {uniqueProjectList.map(project => (
          <li key={project} className="project-list-item">
            #{project}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
