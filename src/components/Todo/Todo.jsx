// import React, { useRef, useState } from "react";
// import Input from "../input/input";
// // import { splitVendorChunk } from "vite";
// import Item from "../Item/Item";

// export default function Todo() {
//   const [todos, setTodos] = useState([]);
//   const todoInput = useRef(null);
//   // const [todoName, setTodoName] = useState("");

//   function handleSubmit(evt) {
//     evt.preventDefault();

//     setTodos([
//       ...todos,
//       { name: todoInput.current.value, isDone: false, id: todos.length + 1 },
//     ]);
//   }

//   function handleToggle(id) {
//     let tempTodos = [...todos];
//     let index = tempTodos.findIndex((todo) => todo.id === id);
//     if (typeof index !== "number") return;

//     tempTodos[index].isDone = !tempTodos[index].isDone;

//     setTodos(tempTodos);
//   }

//   function handleDelete(id) {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   }

//   function clearAll() {
//     setTodos([(todoInput.current.value = "")]);
//   }

//   return (
//     <div className="form-box">
//       <form onSubmit={handleSubmit}>
//         <input
//           ref={todoInput}
//           type="text"
//           // value={todoName}
//           // onChange={(evt) => setTodoName(evt.target.value)}
//           placeholder="Add todo"
//           className="input-add"
//           required
//         />
//         <button type="submit" className="btn-add">
//           Add
//         </button>
//         <button onClick={clearAll} className="clearAll">
//           Clear All
//         </button>
//         <Input
//         ref={todoInput}
//         />
//       </form>
//       <div>
//         {todos.map((todo) => (
//           <Item
//             key={todo.id}
//             onToggle={() => handleToggle(todo.id)}
//             name={todo.name}
//             isDone={todo.isDone}
//             id={todo.id}
//             onDelete={() => handleDelete(todo.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
// import { splitVendorChunk } from "vite";
import Item from "../Item/Item";
import { v4 as uuidv4 } from "uuid";

export default function Todo() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos"))
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  localStorage.setItem(
    "todos",
    JSON.stringify(todos) ? JSON.stringify(todos) : "[]"
  );
  const [todoName, setTodoName] = useState("");
  const [filter, setFilter] = useState("");

  function handleSubmit(evt) {
    setTodoName("");
    localStorage.setItem("todos", JSON.stringify(todos));

    evt.preventDefault();

    setTodos([...todos, { name: todoName, isDone: false, id: uuidv4() }]);
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

  function filterTodo() {
    switch (filter) {
      case "all":
        return todos;
      case "done":
        return todos.filter((todo) => todo.isDone);
      case "not-done":
        return todos.filter((todo) => !todo.isDone);
      default:
        return todos;
    }
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
        <button type="submit" className="btn">
          Add
        </button>
        <button className="btn" onClick={() => setFilter("done")}>
          Show Done
        </button>
        <button className="btn" onClick={() => setFilter("all")}>
          Show All
        </button>
        <button className="btn" onClick={() => setFilter("not-done")}>
          Show Uncompleted
        </button>
        <button className="btn" onClick={() => setTodos([])}>
          Clear All
        </button>
      </form>
      <div>
        {filterTodo().map((todo) => (
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
};