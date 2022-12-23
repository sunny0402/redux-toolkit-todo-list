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
  reducers: {},
});

export default todoSlice.reducer;
