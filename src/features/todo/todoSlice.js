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
  },
});

console.log("todoSlice.js: \n", todoSlice);
export const { createTodo } = todoSlice.actions;

export default todoSlice.reducer;
