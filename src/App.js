import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from "./features/todo/TodoList";
import { SingleTodoPage } from "./features/todo/SingleTodoPage";
import { AddTodoForm } from "./features/todo/AddTodoForm";
import { EditTodoForm } from "./features/todo/EditTodoForm";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="navigation">
        <Link to="/">Home</Link>
        <Link to="/addTodo">Add A To-do</Link>
      </div>

      <Routes>
        <Route path="/" element={<TodoList />} />
        {/* http://localhost:3000/todos/123 */}
        <Route path="/todos/:todoId" element={<SingleTodoPage />} />
        <Route path="/addTodo" element={<AddTodoForm />} />
        <Route path="/editTodo/:todoId" element={<EditTodoForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
