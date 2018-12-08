import React from "react";
import "./taskList.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const TaskList = ({ taskList, onDelete, onDone, onDragBegin }) => {
  return (
    <ul className="plan-list">
      <TransitionGroup>
        {taskList.map(task => (
          <CSSTransition key={task.id} timeout={500} classNames="todoAnim">
            <li key={task.id} draggable onDragStart={e => onDragBegin(e, task)}>
              <div className="card-action">
                <button className="done-button" onClick={() => onDone(task)}>
                  &#10003; MARK DONE
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(task.id)}
                >
                  DEL
                </button>
              </div>
              <h5 className={task.isDone ? "task-text task-done" : "task-text"}>
                {task.taskName}
              </h5>
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
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TaskList;
