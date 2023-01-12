import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from "./features/todo/TodoList";
import { SingleTodoPage } from "./features/todo/SingleTodoPage";
import { AddTodoForm } from "./features/todo/AddTodoForm";
import { EditTodoForm } from "./features/todo/EditTodoForm";
import { CountDownTimer } from "./features/timer/CountDownTimer";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="navigation">
          <Link to="/" className="link-btn">
            Home
          </Link>
          <h2>My Todos</h2>
          <Link to="/addTodo" className="link-btn">
            Add A To-do
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todos/:todoId" element={<SingleTodoPage />} />
          <Route path="/addTodo" element={<AddTodoForm />} />
          <Route path="/editTodo/:todoId" element={<EditTodoForm />} />
          {/* Test */}
          <Route path="/timer/:todoId" element={<CountDownTimer />} />
        </Routes>

        <div className="app-footer">
          <footer>
            <a
              href="https://twitter.com/sunny_codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
