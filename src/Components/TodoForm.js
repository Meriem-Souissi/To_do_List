import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiFillCloseCircle } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { BiCheckCircle } from "react-icons/bi";

const TodoForm = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState("");

  const inp = useRef(null);
  useEffect(() => {
    inp.current.focus();
  }, []);

  const Add = () => {
    if (input.length) {
      setTodos([{ task: input, id: uuidv4(), update: false }, ...todos]);
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
        ref={inp}
        placeholder="ADD A TO DO"
        className="input"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        className="add-button"
        onClick={() => {
          Add();
          setInput("");
        }}
      >
        ADD
      </button>
      <div className="todos">
        {todos.map((todo) => (
          <div className="task">
            <div>
              {!todo.update ? (
                <div>
                  <h3 style={{ display: "inline", margin: 15 }}>{todo.task}</h3>
                  <div className="icons">
                    <BsTrash
                      className="delete-icon"
                      onClick={() =>
                        setTodos(todos.filter((el) => el.id !== todo.id))
                      }
                    />
                    <TiEdit
                      className="edit-icon"
                      onClick={() => {
                        setEdit(todo);
                        setTodos(
                          todos.map((el) =>
                            el.id == todo.id
                              ? { ...el, update: !el.update }
                              : el
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    className="new-input"
                    value={edit.task}
                    onChange={(e) => setEdit({ ...edit, task: e.target.value })}
                    style={{ display: "inline", margin: 15 }}
                  />
                  <div className="new-icons">
                    <AiFillCloseCircle
                      className="delete-icon"
                      onClick={() => {
                        setTodos(
                          todos.map((el) =>
                            el.id == todo.id
                              ? { ...el, update: !el.update }
                              : el
                          )
                        );
                        setEdit("");
                      }}
                    />
                    <BiCheckCircle
                      className="edit-icon"
                      onClick={() => {
                        Save();
                        setEdit("");
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoForm;
