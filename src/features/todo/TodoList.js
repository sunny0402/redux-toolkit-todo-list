import React from "react";
import { useSelector } from "react-redux";

export const TodoList = () => {
  const theTodos = useSelector((state) => state.todo);
  const renderedTodos = theTodos.map((a_todo) => (
    <article className="todo-note" key={a_todo.id}>
      <h3>{a_todo.tile}</h3>
      <h4>{a_todo.category}</h4>
      <p className="todo-note">{a_todo.notes}</p>
    </article>
  ));
  return (
    <div className="app-container-div">
      <section className="todo-list">
        <h2>My Todos</h2>
        {renderedTodos}
      </section>
    </div>
  );
};
