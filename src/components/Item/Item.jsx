import React from "react";

export default function Item({
  name,
  isDone,
  onToggle,
  id,
  onDelete,
}) {
  return (
    <div className="content-todo">
      <input type="checkbox" checked={isDone} onChange={onToggle} />
      <span>{name}</span>
      <button onClick={onDelete} className="btn-close">
        X
      </button>
    </div>
  );
}