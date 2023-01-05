import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import timerReducer from "../features/timer/timerSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    timer: timerReducer,
  },
});
