import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiFillCloseCircle } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { BiCheckCircle } from "react-icons/bi";

const TodoForm = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState("");

  const Add = () => {
    if (input.length !== 0) {
      setTodos([{ task: input, id: uuidv4() }, ...todos]);
      setInput("");
    }
  };

  const Save = () => {
    setTodos(todos.map((el) => (el.id === edit.id ? edit : el)));
  };

  return (
    <div>
      <div className="en-tete">
        <h1>What's the Plan for Today?</h1>
      </div>
      <input
        type="text"
        placeholder="ADD A TO DO"
        className="input"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button className="add-button" onClick={Add}>
        ADD{" "}
      </button>
      <div className="todos">
        {todos.map((todo) => (
          <div className="task">
            {!edit ? (
              <div>
                <h3 style={{ display: "inline", margin: 15 }}>{todo.task}</h3>
                <div className="icons">
                  <BsTrash
                    className="delete-icon"
                    onClick={() =>
                      setTodos(todos.filter((el) => el.id !== todo.id))
                    }
                  />

                  <TiEdit className="edit-icon" onClick={() => setEdit(todo)} />
                </div>{" "}
              </div>
            ) : (
              <div>
                <input
                  value={edit.task}
                  onChange={(e) => setEdit({ ...edit, task: e.target.value })}
                  style={{ display: "inline", margin: 15 }}
                />
                <div className="icons">
                  <AiFillCloseCircle
                    className="delete-icon"
                    onClick={() => setEdit("")}
                  />
                  <BiCheckCircle className="edit-icon" onClick={() => Save()} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoForm;
