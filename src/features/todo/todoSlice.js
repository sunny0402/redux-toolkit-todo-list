import { createSlice } from "@reduxjs/toolkit";

const initialTodoData = [
  { id: "123", title: "First Todo", notes: "Do this now.", category: "urget" },
  {
    id: "456",
    title: "Second Todo",
    notes: "Do this later.",
    category: "not urgent",
  },
];

const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoData,
  reducers: {
    createTodo(state, action) {
      state.push(action.payload);
    },
    updateTodo(state, action) {
      const { id, title, notes, category } = action.payload;
      const todo2Update = state.find((a_todo) => a_todo.id === id);
      if (todo2Update) {
        todo2Update.title = title;
        todo2Update.notes = notes;
        todo2Update.category = category;
      }
    },
    deleteTodo(state, action) {
      const { deleteId } = action.payload;
      return state.filter((a_todo) => a_todo.id !== deleteId);
    },
  },
});

export const { createTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
