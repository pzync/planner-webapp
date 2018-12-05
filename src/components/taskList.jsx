import React from "react";
import "./taskList.css";

const TaskList = ({ taskList }) => {
  return (
    <ul className="plan-list">
      {taskList.map(task => (
        <li key={task.id}>
          <h5 className="task-text">{task.taskName}</h5>
          <div className="task-details">
            <a href={`/#${task.project}`} className="task-project">{`#${
              task.project
            }`}</a>
            <a href={`/@${task.assignee}`} className="task-assignee">{`@${
              task.assignee
            }`}</a>
            <p className="task-date">{task.workDate}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
