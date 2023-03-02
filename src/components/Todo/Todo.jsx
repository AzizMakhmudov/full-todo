import React, { useState } from "react";
// import { splitVendorChunk } from "vite";
import Item from "../Item/Item";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    setTodos([
      ...todos,
      { name: todoName, isDone: false, id: todos.length + 1 },
    ]);
  }

  function handleToggle(id) {
    let tempTodos = [...todos];
    let index = tempTodos.findIndex((todo) => todo.id === id);
    if (typeof index !== "number") return;

    tempTodos[index].isDone = !tempTodos[index].isDone;

    setTodos(tempTodos);
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearAll() {
    setTodos([]);
  }

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoName}
          onChange={(evt) => setTodoName(evt.target.value)}
          placeholder="Add todo"
          className="input-add"
          required
        />
        <button type="submit" className="btn-add">
          Add
        </button>
        <button onClick={clearAll}>Clear All</button>
      </form>
      <div>
        {todos.map((todo) => (
          <Item
            key={todo.id}
            onToggle={() => handleToggle(todo.id)}
            name={todo.name}
            isDone={todo.isDone}
            id={todo.id}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}
