import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./todoSlice";
import { CountDownTimer } from "../timer/CountDownTimer";

export const TodoList = () => {
  const theTodos = useSelector((state) => state.todo);

  const dispatch = useDispatch();
  const handleDelete = (deleteId) => {
    dispatch(deleteTodo({ deleteId }));
  };

  const renderedTodos = theTodos.map((a_todo) => (
    <article className="todo-article-container" key={a_todo.id}>
      <h3>{a_todo.title}</h3>
      <h4>{a_todo.category}</h4>
      <p className="todo-note">{`${a_todo.notes.substring(0, 10)}...`}</p>
      <Link to={`/todos/${a_todo.id}`} className="link-btn">
        View Todo
      </Link>
      <button onClick={() => handleDelete(a_todo.id)}>Delete</button>
      <CountDownTimer todoId={a_todo.id} />
    </article>
  ));
  return (
    <div className="app-container-div">
      <section>
        <h2>My Todos</h2>
        {renderedTodos}
      </section>
    </div>
  );
};
