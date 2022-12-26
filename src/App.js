import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from "./features/todo/TodoList";
import { SingleTodoPage } from "./features/todo/SingleTodoPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        {/* http://localhost:3000/todos/123 */}
        <Route path="/todos/:todoId" element={<SingleTodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
