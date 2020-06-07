import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const DATA = [
  { id: "todo-0", name: "Study the MDN React tutorial", completed: true },
  { id: "todo-1", name: "Get 8 hours of sleep", completed: false },
  { id: "todo-2", name: "Don't skip breakfast", completed: false },
  { id: "todo-3", name: "Work out 30 minutes in the morning", completed: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App subject="Mihail" tasks={DATA} />
  </React.StrictMode>,
  document.getElementById("root")
);
