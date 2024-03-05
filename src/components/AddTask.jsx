import axios from "axios";
import React, { useState } from "react";
import "./AddTask.css";

const TaskAdder = ({ onTaskAdded }) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [notification, setNotification] = useState("");
  const [typeNotification, setTypeNotification] = useState("");

  const getInfoName = (e) => {
    setNameInput(e.target.value);
  };

  const getInfoDescription = (e) => {
    setDescriptionInput(e.target.value);
  };

  const addTask = async (e) => {
    if (!nameInput || !descriptionInput) {
      setNotification("You must fill in the fields to add the task");
      setTypeNotification("Error");
      setTimeout(() => {
        setNotification("");
        setTypeNotification("");
      }, 3000);
      return;
    }

    e.preventDefault();

    const newTask = {
      name: nameInput,
      description: descriptionInput,
    };
    await axios.post("http://localhost:5001/addTask", newTask);
    onTaskAdded();

    setNameInput("");
    setDescriptionInput("");
    setNotification("Task successfully added");
    setTypeNotification("Successfully");
    setTimeout(() => {
      setNotification("");
      setTypeNotification("");
    }, 3000);
  };

  return (
    <div className="panel">
      <div className="addTaskComponents">
        <div className="flexInput">
          <div className="orderInput">
            <label htmlFor="name">
              <h3>Task name:</h3>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Write here..."
              className="nameInput"
              required
              value={nameInput}
              onChange={getInfoName}
              autoComplete="username"
            />
          </div>
          <div className="orderInput">
            <label htmlFor="description">
              <h3>Description:</h3>
            </label>
            <input
              type="text"
              id="description"
              placeholder="Write here..."
              className="descriptionInput"
              required
              value={descriptionInput}
              onChange={getInfoDescription}
              autoComplete="current-password"
            />
          </div>
        </div>
        <div>
          <button className="addTaskButton" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>
      <p className={`alert${typeNotification}`}>{notification}</p>
    </div>
  );
};

export default TaskAdder;
