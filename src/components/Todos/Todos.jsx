import React, { useEffect, useLayoutEffect, useState } from "react";
import GetTime from "./GetTime";

const Todos = () => {
  const [isDone, setIsDone] = useState(false);
  const [todoData, setTodoData] = useState({
    id: "",
    titleData: "",
    descriptionData: "",
    priorityData: "",
    timeData: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState("");

  //   get data from local storage

  const getDataFromLocalStorage = () => {
    const todoList = localStorage.getItem("todos");

    if (todoList) {
      return JSON.parse(localStorage.getItem("todos"));
    } else {
      return [];
    }
  };

  const [todo, setTodo] = useState(getDataFromLocalStorage());

  useLayoutEffect(() => {
    // const inputString = time;
    // const dt = new Date(inputString);

    // Format the output string
    // const options = {
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // };
    // const outputString = dt.toLocaleString("en-US", options);

    // var currentdate = new Date();
    // var datetime =
    //   "Added on: " +
    //   currentdate.getDate() +
    //   "/" +
    //   (currentdate.getMonth() + 1) +
    //   "/" +
    //   currentdate.getFullYear() +
    //   " at " +
    //   currentdate.getHours() +
    //   ":" +
    //   currentdate.getMinutes() +
    //   ":" +
    //   currentdate.getSeconds()
    //   ;

    setTodoData({
      id: new Date(),
      titleData: title,
      descriptionData: description,
      priorityData: priority,
      timeData: GetTime(),
    });
  }, [title, description, priority, time]);

  const handleSubmit = () => {
    if (
      todoData.titleData !== "" &&
      todoData.descriptionData !== "" &&
      todoData.priorityData !== ""
      // &&
      // todoData.timeData !== "Invalid Date" &&
      // todoData.timeData !== ""
    ) {
      setTodo([...todo, todoData]);
      setTitle("");
      setDescription("");
      setPriority("");
      // setTime("");
    } else {
      if (
        todoData.titleData === "" &&
        todoData.descriptionData === "" &&
        todoData.priorityData === ""
        // todoData.timeData === ""
      ) {
        return alert("Please enter all the details!📝");
      } else {
        if (todoData.titleData === "") {
          alert("Please enter the title of todo");
        } else if (todoData.descriptionData === "") {
          alert("Please enter the description of todo");
        } else {
          alert("Please enter the priority of your todo");
        }
      }
    }
  };

  const deleteTodo = (id) => {
    const filterArray = todo.filter((todo, index) => {
      return index !== id;
    });

    setTodo(filterArray);
  };

  //   store data in localstorage

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  });

  return (
    <>
      <main className="todos-container">
        {/* <h1 className="todos-heading">Add Todo</h1> */}
        <div className="todos">
          <div className="todo-input-container">
            <input
              type="text"
              name="title"
              id="title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <label htmlFor="title" className="label-effect">
              Title
            </label>
          </div>
          <div className="todo-input-container">
            <input
              type="text"
              name="description"
              required
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
            <label htmlFor="description" className="label-effect">
              Description
            </label>
          </div>
          <div className="todo-input-container priority-container">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              // value={`${priority ? priority : "Priority"}`}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value="">choose a priority</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            <div className="priority-drop-down-img">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/arcade/64/down-squared.png"
                alt="down-squared"
              />
            </div>
          </div>
          {/* want to get current time by not taking it from input */}
          {/* <div className="todo-input-container">
            <label htmlFor="time">Time</label>
            <input
              type="datetime-local"
              name="time"
              id="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </div> */}
          <div className="todo-input-container">
            <button type="submit" id="submit-todo-btn" onClick={handleSubmit}>
              Submit
            </button>
            {(title !== "" || description !== "" || priority !== "") && (
              // <div className="todo-input-container">
              <button
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setPriority("");
                  // setTime("");
                }}
              >
                Reset
              </button>
              // </div>
            )}
          </div>
        </div>
      </main>

      {/* Showing Todos below the add todo component */}

      <main className="display-todos-container">
        <h1>Your Todos</h1>
        {todo.map((todo, index) => {
          return (
            <div
              className={`todo-container ${isDone ? "todo-is-done" : ""}`}
              key={todo.id}
            >
              <h2>{todo.titleData}</h2>
              <p className={`todo-desc ${isDone ? "todo-is-done" : ""}`}>{todo.descriptionData}</p>
              <span>
                Priority : <strong>{todo.priorityData}</strong>
              </span>
              <p class="todo-time">{todo.timeData}</p>
              <img
                src="https://img.icons8.com/arcade/64/delete-forever.png"
                alt="filled-trash"
                className="delete-icon"
                onClick={() => deleteTodo(index)}
              />
              <div className="todo-checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  onClick={() => {
                    setIsDone(!isDone);
                  }}
                />
                <label htmlFor="checkbox">Done</label>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Todos;
