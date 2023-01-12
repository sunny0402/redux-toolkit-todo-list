import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./todoSlice";
import { updateTimer } from "../timer/timerSlice";
import { format, parseISO } from "date-fns";

export const TodoList = () => {
  // Get to-do and timer state form Redux store.
  const theTodos = useSelector((state) => state.todo);
  const theTodoTimers = useSelector((state) => state.timer);

  const dispatch = useDispatch();
  const handleDelete = (deleteId) => {
    dispatch(deleteTodo({ deleteId }));
  };

  // Get all running timers. Will pass these to useEffect to update them.
  const allRunningTimers = theTodoTimers
    .filter((a_timer) => a_timer.isRunning === true)
    .reduce((hashMap, runningTimer) => {
      hashMap[runningTimer.id] = runningTimer;
      return hashMap;
    }, {});

  //Update timer state by dispatching updateTimer action.
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      for (let timerID in allRunningTimers) {
        dispatch(
          updateTimer({
            id: timerID,
          })
        );
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [theTodoTimers]);

  // Order todos by time remaining. The to-do expiring soonest will be first in list.
  const orderedTodos = theTodos.slice().sort((a, b) => {
    const timerA = theTodoTimers.find((t) => t.id === a.id);
    const timerB = theTodoTimers.find((t) => t.id === b.id);

    if (!timerA?.dueDate) return 1;
    if (!timerB?.dueDate) return -1;

    // Sort the todos on timer.dueDate
    return timerA.dueDate.localeCompare(timerB.dueDate);
  });

  const renderedTodos = orderedTodos.map((a_todo, idx) => (
    <article className="grid-item" key={a_todo.id}>
      <h3>{a_todo.title}</h3>
      {allRunningTimers[a_todo.id]?.dueDate && (
        <h4>
          Due Date:{" "}
          {format(
            parseISO(allRunningTimers[a_todo.id].dueDate),
            "yyyy-MM-dd | HH:mm",
            { timeZone: "UTC" }
          )}
        </h4>
      )}
      {allRunningTimers[a_todo.id]?.timeRemaining && (
        <h4>
          Weeks:&nbsp; {allRunningTimers[a_todo.id].timeRemaining.weeks}&nbsp;
          Days:&nbsp;{allRunningTimers[a_todo.id].timeRemaining.days}&nbsp;
          Hours: &nbsp;{allRunningTimers[a_todo.id].timeRemaining.hours}&nbsp;
          Minutes:&nbsp;{allRunningTimers[a_todo.id].timeRemaining.minutes}
          &nbsp;
        </h4>
      )}

      <h4>{a_todo.category}</h4>
      <p className="todo-note">{`${a_todo.notes.substring(0, 20)}...`}</p>
      <Link to={`/todos/${a_todo.id}`} className="link-btn">
        View Todo Info
      </Link>
      <Link to={`/timer/${a_todo.id}`} className="link-btn">
        To-do Timer
      </Link>
      <button onClick={() => handleDelete(a_todo.id)}>Delete</button>
    </article>
  ));
  return <div className="todo-list-container">{renderedTodos} </div>;
};
