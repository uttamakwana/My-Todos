import React, { useEffect, useLayoutEffect, useState } from "react";
import GetTime from "./GetTime";
import { motion } from "framer-motion";

const Todos = () => {
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

  const getIsTodoDoneArrayFromLocalStorage = () => {
    const isTodoDoneArrayList = localStorage.getItem("isTodoDoneStateArray");
    if (isTodoDoneArrayList) {
      return JSON.parse(localStorage.getItem("isTodoDoneStateArray"));
    } else {
      return [];
    }
  };

  const [isDone, setIsDone] = useState(getIsTodoDoneArrayFromLocalStorage());
  // const [idOfTodo, setIdOfTodo] = useState(0);

  const [todo, setTodo] = useState(getDataFromLocalStorage());

  const [handleTodoButton, setHandleTodoButton] = useState(false);

  const delayForTodoCard = (index, state) => {
    //? */ (index * 0.6) according to DMAS rule this will first execute
    return `${state ? 0.6 : 4.3 + index * 0.6}`;
  };

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
    setHandleTodoButton(true);
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
    localStorage.setItem("isTodoDoneStateArray", JSON.stringify(isDone));
  });

  const toggleDone = (index) => {
    setIsDone((prev) => {
      const updateTodoDoneArray = [...prev];
      updateTodoDoneArray[index] = !updateTodoDoneArray[index];
      return updateTodoDoneArray;
    });
  };

  const toggleDoneOnDelete = (index) => {
    setIsDone((prev) => {
      const updateTodoDoneArray = [...prev];
      updateTodoDoneArray[index] = false;
      return updateTodoDoneArray;
    });
  };

  return (
    <>
      <main className="todos-container">
        {/* <h1 className="todos-heading">Add Todo</h1> */}
        <div className="todos">
          <motion.div
            transition={{ delay: 1.1 }}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="todo-input-container"
          >
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
          </motion.div>
          <motion.div
            transition={{ delay: 1.5 }}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="todo-input-container"
          >
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
          </motion.div>
          <motion.div
            transition={{ delay: 1.9 }}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="todo-input-container priority-container"
          >
            {/* <label htmlFor="priority">Priority</label> */}
            <select
              name="priority"
              id="priority"
              value={`${priority ? priority : ""}`}
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
                src="https://img.icons8.com/fluency/48/circled-chevron-down.png"
                alt="down-squared"
              />
            </div>
          </motion.div>
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
            <motion.button
              type="submit"
              id="submit-todo-btn"
              onClick={handleSubmit}
              transition={{ delay: 2.3, duration: 0.5 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              Add Todo
            </motion.button>
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

      {todo.length !== 0 ? (
        <motion.main
          transition={{
            delay: 2.5,
            duration: 0.5,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="display-todos-container"
        >
          <motion.h1>
            <motion.span
              transition={{ delay: 2.5 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              Y
            </motion.span>
            <motion.span
              transition={{ delay: 2.7 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              o
            </motion.span>
            <motion.span
              transition={{ delay: 2.9 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              u
            </motion.span>
            <motion.span
              transition={{ delay: 3.1 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              r
            </motion.span>
            &nbsp;
            <motion.span
              transition={{ delay: 3.3 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              T
            </motion.span>
            <motion.span
              transition={{ delay: 3.5 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              o
            </motion.span>
            <motion.span
              transition={{ delay: 3.7 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              d
            </motion.span>
            <motion.span
              transition={{ delay: 3.9 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              o
            </motion.span>
            <motion.span
              transition={{ delay: 4.1 }}
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              s
            </motion.span>
          </motion.h1>
          {todo.map((todo, index) => {
            const isTodoDone = isDone[index];
            return (
              <motion.div
                transition={{
                  delay: delayForTodoCard(index, handleTodoButton),
                  duration: 0.5,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                // className={`todo-container ${isDone ? "todo-is-done" : ""}`}
                className={`todo-container ${isTodoDone ? "todo-is-done" : ""}`}
                key={todo.id}
                style={{}}
              >
                <h2>{todo.titleData}</h2>
                {/* <p className={`todo-desc ${isDone ? "todo-is-done" : ""}`}>{todo.descriptionData}</p> */}
                <p className="todo-desc">{todo.descriptionData}</p>
                <span>
                  Priority : <strong>{todo.priorityData}</strong>
                </span>
                <p className="todo-time">{todo.timeData}</p>
                <img
                  src="https://img.icons8.com/arcade/64/delete-forever.png"
                  alt="filled-trash"
                  className="delete-icon"
                  onClick={() => {
                    deleteTodo(index);
                    toggleDoneOnDelete(index);
                  }}
                />
                <div className="todo-checkbox">
                  {!isTodoDone ? (
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      checked={isTodoDone}
                      onChange={() => {
                        toggleDone(index);
                      }}
                      // onClick={() => {
                      //   setIdOfTodo(index);
                      //   setIsDone(!isDone);
                      // }}
                    />
                  ) : (
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/arcade/64/checkmark.png"
                      alt="checkmark"
                      onClick={() => {
                        toggleDone(index);
                      }}
                    />
                  )}
                  {!isTodoDone ? (
                    <label htmlFor={`checkbox-${index}`}>Done</label>
                  ) : (
                    ""
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.main>
      ) : (
        ""
      )}
    </>
  );
};

export default Todos;
