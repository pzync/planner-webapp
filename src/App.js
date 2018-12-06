import React, { Component } from "react";
import "./App.css";
import TaskBoard from "./components/taskBoard";
import ProjectList from "./components/projectList";
import PeopleList from "./components/peopleList";
import { CSSTransition } from "react-transition-group";

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

    // these clear out the inputs once entered, sets the date to today
    // and moves the focus back to primary task input field
    this.refs.task.value = "";
    this.refs.project.value = "";
    this.refs.assignee.value = "";
    this.refs.workdate.value = today.toISOString().substr(0, 10);

    this.refs.task.focus();
  };

  handleDelete = id => {
    const taskList = this.state.taskList.filter(task => task.id !== id);
    this.setState({ taskList });
  };

  componentDidMount() {
    // this keeps the task input field in focus when the page loads
    this.refs.task.focus();

    // fetch the taskList from localStorage when the page loads
    const json = localStorage.getItem("taskList");
    const taskList = JSON.parse(json);

    // without this if statement, a null value would update state.taskList
    // which would give errors in taskBoard.jsx because we'll applying .filter on
    // a null value
    if (taskList) {
      this.setState({ taskList });
    }
  }

  componentDidUpdate() {
    //store in localStorate the taskList each time it updates
    const taskList = JSON.stringify(this.state.taskList);
    localStorage.setItem("taskList", taskList);
  }

  render() {
    return (
      <div className="App">
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <div className="container">
            <div className="info-area">
              <h3>Shekhar's Plan</h3>
              <p>{today.toGMTString().substr(0, 16)}</p>
            </div>
            <form className="form-area" onSubmit={this.handleSubmit}>
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
            <div className="left-sidebar">
              <ProjectList taskList={this.state.taskList} />
              <PeopleList taskList={this.state.taskList} />
            </div>
            <TaskBoard
              className="task-board"
              taskList={this.state.taskList}
              onDelete={this.handleDelete}
            />
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default App;
