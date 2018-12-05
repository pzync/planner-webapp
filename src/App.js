import React, { Component } from "react";
import "./App.css";
import TaskBoard from "./components/taskBoard";

const today = new Date();

class App extends Component {
  state = {
    taskList: []
  };

  handleSubmit = event => {
    event.preventDefault();
    let id = Math.floor(Math.random() * 100) + 1;
    let taskName = this.refs.task.value;
    let project = this.refs.project.value;
    let assignee = this.refs.assignee.value;
    let workDate = this.refs.workdate.value;

    this.setState({
      taskList: [
        ...this.state.taskList,
        { id, taskName, project, assignee, workDate }
      ]
    });

    this.refs.task.value = "";
    this.refs.project.value = "";
    this.refs.assignee.value = "";
    this.refs.workdate.value = today.toISOString().substr(0, 10);

    this.refs.task.focus();
  };

  componentDidMount() {
    // this keeps the task input field in focus when the page loads
    this.refs.task.focus();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            className="task-input"
            type="text"
            placeholder="Describe task here"
            ref="task"
          />
          <div className="second-row">
            <input
              className="project-input"
              type="text"
              placeholder="For Project"
              ref="project"
            />
            <input
              className="assignee-input"
              type="text"
              placeholder="Assigned to"
              ref="assignee"
            />
            <input
              className="date-input"
              type="date"
              defaultValue={today.toISOString().substr(0, 10)}
              ref="workdate"
            />
            <button className="submit-button" type="submit">
              Add
            </button>
          </div>
        </form>
        <div className="list-area">
          <TaskBoard taskList={this.state.taskList} />
        </div>
      </div>
    );
  }
}

export default App;
