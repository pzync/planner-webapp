import React from "react";
import "./taskBoard.css";
import TaskList from "./taskList";

// getting today and tomorrow dates
// based on https://stackoverflow.com/questions/563406/add-days-to-javascript-date
let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

// converting today and tomorrow dates to formats required to compare with
// string date formats coming in from state.taskList 's task.workDate
today = today.toISOString().substr(0, 10);
tomorrow = tomorrow.toISOString().substr(0, 10);

const TaskBoard = ({ taskList, onDelete, onDone }) => {
  const todayList = taskList.filter(task => task.workDate === today);
  const tomorrowList = taskList.filter(task => task.workDate === tomorrow);
  const laterList = taskList.filter(
    task => task.workDate !== tomorrow && task.workDate !== today
  );

  return (
    <div className="task-board">
      <div className="task-list today-list">
        <h2>Today</h2>
        <TaskList taskList={todayList} onDelete={onDelete} onDone={onDone} />
      </div>
      <div className="task-list tomorrow-list">
        <h2>Tomorrow</h2>
        <TaskList taskList={tomorrowList} onDelete={onDelete} onDone={onDone} />
      </div>
      <div className="task-list later-list">
        <h2>Later</h2>
        <TaskList taskList={laterList} onDelete={onDelete} onDone={onDone} />
      </div>
    </div>
  );
};

export default TaskBoard;
