import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [refresh, toggle] = useState(false);

  useEffect(() => {
    getTasks();
  }, [refresh]);

  const getTasks = async () => {
    const response = await fetch("http://localhost:5001/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const deleteTask = async (name) => {
    await axios.delete(`http://localhost:5001/deleteTask/${name}`);
    toggle(!refresh);
  };

  const updateCheck = async (name) => {
    await axios.patch(`http://localhost:5001/updateTask/${name}`);
    toggle(!refresh);
  };

  const updateTask = async (name, nameEdited, descriptionEdited) => {
    // e.preventDefault();
    console.log(
      "nombre que llega:",
      nameEdited,
      "Descripcioon que llega: ",
      descriptionEdited
    );
    const newTask = JSON.stringify({
      name: nameEdited,
      description: descriptionEdited,
    });
    await axios.patch(`http://localhost:5001/updateTask/info/${name}`, newTask);
    toggle(!refresh);
  };

  const onTaskAdded = () => {
    toggle(!refresh);
  };

  return (
    <>
      <h1>To Do App</h1>
      <AddTask onTaskAdded={onTaskAdded} />
      <Tasks
        tasks={tasks}
        onTaskDeleted={deleteTask}
        onCheckUpdate={updateCheck}
        updateTask={updateTask}
      />
    </>
  );
}

export default App;
