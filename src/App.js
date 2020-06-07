import React, { useState, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import "./App.css";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    // folosim nanoid pentru id-uri unice de task
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        if (!task.completed) {
          alert('"' + task.name + '"' + " completed! Well done!");
        }

        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);
  }

  const TaskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task.id}
        name={task.name}
        completed={task.completed}
        id={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    ));

  function completedTasks() {
    return tasks.filter((task) => task.completed === true).length;
  }

  const FilterButtonList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksToGo = tasks.length - completedTasks();
  const tasksToGoNoun = tasksToGo !== 1 ? "tasks" : "task";
  const tasksCompleted = completedTasks();
  const tasksCompletedNoun = tasksCompleted !== 1 ? "tasks" : "task";
  const taskListHeadingText = `${tasksToGo} ${tasksToGoNoun} to go, ${tasksCompleted} ${tasksCompletedNoun} completed`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>{props.subject}'s To-Do List</h1>

      <Form addTask={addTask} />

      <h2 id="list-heading" 
          tabIndex="-1"
          ref={listHeadingRef}
      >{taskListHeadingText}</h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {TaskList}
      </ul>

      <h2 id="filter-heading">Sort tasks by:</h2>

      <div className="filters btn-group stack-exception">
        {FilterButtonList}
      </div>
    </div>
  );
}

export default App;
