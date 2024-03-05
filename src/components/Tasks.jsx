import {
  faArrowsRotate,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Tasks.css";

const TaskList = ({ tasks, onTaskDeleted, onCheckUpdate, updateTask }) => {
  const [editModes, setEditModes] = useState(Array(tasks.length).fill(false));
  const [nameEdited, setNameEdited] = useState("");
  const [descriptionEdited, setDescriptionEdited] = useState("");

  const onNameEdited = (e) => {
    setNameEdited(e.target.value);
  };

  const onDescriptionEdited = (e) => {
    setDescriptionEdited(e.target.value);
  };

  const toggleEditMode = (index) => {
    const newEditModes = [...editModes];
    newEditModes[index] = !newEditModes[index];
    setEditModes(newEditModes);
  };

  return (
    <div className="panelTask">
      <ul className="flexTasks">
        {tasks.map((task, index) => (
          <li
            key={task._id}
            className={`taskContainer ${task.check ? "isCheck" : "isNotCheck"}`}
          >
            <div className="textContainer">
              {editModes[index] ? (
                <input onChange={onNameEdited} />
              ) : (
                <p className="taskTitle">{task.name}</p>
              )}
              {editModes[index] ? (
                <input onChange={onDescriptionEdited} />
              ) : (
                <p className="taskDescription">{task.description}</p>
              )}
            </div>
            <div className="flexButtons">
              {/* Complete button */}
              <button
                className={`buttonStyle buttonCheck ${
                  task.check ? "isCheckButton" : ""
                }`}
                onClick={() => onCheckUpdate(task.name)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              {/* Update button */}
              <button
                className={`buttonStyle buttonUpdate ${
                  task.check ? "isCheckButton" : ""
                }`}
                onClick={() => {
                  toggleEditMode(index);
                  updateTask(task.name, nameEdited, descriptionEdited);
                  console.log("Update clicked");
                }}
              >
                {editModes[index] ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faArrowsRotate} />
                )}
              </button>
              {/* Delete Button */}
              <button
                className="buttonStyle buttonDelete"
                onClick={() => onTaskDeleted(task.name)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
