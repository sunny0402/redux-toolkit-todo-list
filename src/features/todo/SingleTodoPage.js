import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const SingleTodoPage = () => {
  let params = useParams();
  const { todoId } = params;

  const theTodo = useSelector((state) =>
    state.todo.find((a_todo) => a_todo.id === todoId)
  );
  if (!theTodo) {
    return (
      <section>
        <h2>To-do not found.</h2>
      </section>
    );
  } else {
    return (
      <section>
        <article className="todo-article-container" key={theTodo.id}>
          <h3>{theTodo.tile}</h3>
          <h4>{theTodo.category}</h4>
          <p className="todo-note">{theTodo.notes}</p>
        </article>
      </section>
    );
  }
};
