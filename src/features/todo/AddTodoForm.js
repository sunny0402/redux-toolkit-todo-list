import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { createTodo } from "./todoSlice";

export const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onNotesChanged = (e) => setNotes(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);

  //   update app state by creating a new todo
  const onSaveTodoClicked = () => {
    if (title && notes && category) {
      //   update state
      dispatch(
        createTodo({
          id: nanoid(),
          title: title,
          notes: notes,
          category: category,
        })
      );
      // clear input fields
      setTitle("");
      setNotes("");
      setCategory("");
    }
  };

  return (
    <section>
      <form>
        <label htmlFor="todoTitle">Todo Title:</label>
        <input
          type="text"
          id="todoTitle"
          name="todoTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="todoNotes">Notes:</label>
        <textarea
          id="todoNotes"
          name="todoNotes"
          value={notes}
          onChange={onNotesChanged}
        />
        <label htmlFor="todoNotes">Category:</label>
        <textarea
          id="todoCategory"
          name="todoCategory"
          value={category}
          onChange={onCategoryChanged}
        />
        <button type="button" onClick={onSaveTodoClicked}>
          Add a New To-do
        </button>
      </form>
    </section>
  );
};
