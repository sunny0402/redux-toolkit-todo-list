import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./todoSlice";
import { CountDownTimer } from "../timer/CountDownTimer";

export const TodoList = () => {
  const theTodos = useSelector((state) => state.todo);
  const theTodoTimers = useSelector((state) => state.timer);

  const dispatch = useDispatch();
  const handleDelete = (deleteId) => {
    dispatch(deleteTodo({ deleteId }));
  };
  // Note:
  // a negative value if a should be sorted before b
  // a positive value if a should be sorted after b
  // 0 if a and b are equal and their order doesn't matter

  const orderedTodos = theTodos.slice().sort((a, b) => {
    const timerA = theTodoTimers.find((t) => t.id === a.id);
    const timerB = theTodoTimers.find((t) => t.id === b.id);

    if (!timerA?.dueDate) return 1;
    if (!timerB?.dueDate) return -1;

    // Sort the todos on timer.dueDate
    return timerA.dueDate.localeCompare(timerB.dueDate);
  });

  const renderedTodos = orderedTodos.map((a_todo) => (
    //Test
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
