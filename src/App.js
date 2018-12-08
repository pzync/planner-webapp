import React, { Component } from "react";
import "./App.css";
import TaskBoard from "./components/taskBoard";
import ProjectList from "./components/projectList";
import PeopleList from "./components/peopleList";
import { CSSTransition } from "react-transition-group";

let today = new Date();
let tomorrow = new Date();
let later = new Date();
tomorrow.setDate(today.getDate() + 1);
later.setDate(today.getDate() + 14);

// today = today.toISOString().substr(0, 10);
// tomorrow = tomorrow.toISOString().substr(0, 10);
// later = later.toISOString().substr(0, 10);

class App extends Component {
  state = {
    taskList: []
  };

  handleSubmit = event => {
    event.preventDefault();
    let id = Math.floor(Math.random() * 1000) + 1;
    let taskName = this.refs.task.value;
    let project = this.refs.project.value;
    let assignee = this.refs.assignee.value;
    let workDate = this.refs.workdate.value;
    let isDone = false; // setting the task default status to 'not done'

    this.setState({
      taskList: [
        ...this.state.taskList,
        { id, taskName, project, assignee, workDate, isDone }
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

  handleDone = task => {
    const taskList = [...this.state.taskList];
    const index = taskList.indexOf(task);
    taskList[index] = { ...task };
    taskList[index].isDone = true;
    this.setState({ taskList });
  };

  handleDragBegin = (e, task) => {
    e.dataTransfer.setData("id", task.id);
    // it seems the setData() can only carry a single, simple data item
    // having it carry the object was giving issues
    //maybe just like localStorage setItem(), i could have first converted
    // the task object to a string and then had it carried

    // IMP: essentially the dataTransfer setData and getData function almost
    // exactly like localStorage setItem and getItem
  };

  handleDragEnding = e => {
    e.preventDefault();
  };

  handleDropping = (e, listTitle) => {
    let id = e.dataTransfer.getData("id");
    // IMP: remember the e.dataTransfer.getData() function outputs a string
    // just like the localStorage getItem()
    // because strings are the easiest to carry data and can be parsed later into
    // a readable required format
    // so this id is a string and not a Number

    let finalDate =
      listTitle === "today"
        ? today.toISOString().substr(0, 10)
        : listTitle === "tomorrow"
        ? tomorrow.toISOString().substr(0, 10)
        : later.toISOString().substr(0, 10);

    const taskList = [...this.state.taskList];
    console.log(id, typeof id, listTitle);

    const index = taskList.findIndex(task => task.id === Number(id));
    // damn! this id was a string and i was comparing it with task.id which is a number
    // no wonder i was getting Undefined as the value of 'index'
    // so the above typeof console log really helped me understand that
    // i was comparing id's of two different types

    // IMP: remember the e.dataTransfer.getData() function outputs a string
    // #typeChecking is important, man!

    const taskToUpdate = taskList.find(task => task.id === Number(id));
    taskList[index] = { ...taskToUpdate };
    // if i don't do the above spread-copying of taskToUpdate
    // since this is deep-copy, it will update at source

    taskList[index].workDate = finalDate;
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
              onDone={this.handleDone}
              onDragBegin={this.handleDragBegin}
              onDragEnding={this.handleDragEnding}
              onDropping={this.handleDropping}
            />
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default App;
