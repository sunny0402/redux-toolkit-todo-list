import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateTodo } from "./todoSlice";
import { useParams } from "react-router-dom";

export const EditTodoForm = () => {
  let params = useParams();
  const { todoId } = params;

  const updateThisTodo = useSelector((state) =>
    state.todo.find((a_todo) => a_todo.id === todoId)
  );

  //populate component state with this todo's data from Redux store
  const [title, setTitle] = useState(updateThisTodo.title);
  const [notes, setNotes] = useState(updateThisTodo.notes);
  const [category, setCategory] = useState(updateThisTodo.category);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onNotesChanged = (e) => setNotes(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);

  const onUpdateTodoClicked = () => {
    if (title && notes && category) {
      dispatch(
        updateTodo({
          id: todoId,
          title: title,
          notes: notes,
          category: category,
        })
      );
      //   redirect to the single to-do page view
      navigate(`/todos/${todoId}`);
    }
  };

  return (
    <section>
      <form>
        <label htmlFor="todoTitle">Update Title:</label>
        <input
          type="text"
          id="todoTitle"
          name="todoTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="todoNotes">Update Notes:</label>
        <textarea
          id="todoNotes"
          name="todoNotes"
          value={notes}
          onChange={onNotesChanged}
        />
        <label htmlFor="todoNotes">Update Category:</label>
        <input
          id="todoCategory"
          name="todoCategory"
          value={category}
          onChange={onCategoryChanged}
        />
        <button type="button" onClick={onUpdateTodoClicked}>
          Update the To-do
        </button>
      </form>
    </section>
  );
};
