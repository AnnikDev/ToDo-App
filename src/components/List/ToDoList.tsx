import "./ToDoList.css";
import { useState, KeyboardEvent } from "react";

type TTodo = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function ToDo() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [filter, setFilter] = useState<"ALL" | "Active" | "Completed">("ALL");
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = (event: KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;

    if (event.key == "Enter" && inputElement.value.trim() !== "") {
      setTodos([
        ...todos,
        { id: Math.random(), title: inputElement.value, isDone: false },
      ]);
      inputElement.value = "";
    }
  };

  const deleteTodo = (todoId: number): void => {
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  const markTodo = (todoId: number): void => {
    setTodos(
      todos.map((item) =>
        item.id === todoId ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const clearCompleted = (): void => {
    setTodos(todos.filter((item) => !item.isDone));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.isDone;
    if (filter === "Completed") return todo.isDone;
    return true;
  });

  const remainingTodosCount = todos.filter((todo) => !todo.isDone).length;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <>
      <div>
        <img
          className="bgLightCover"
          src="/images/bg-desktop-light.jpg"
          alt=""
        />
        <img className="bgDarkCover" src="/images/bg-desktop-dark.jpg" alt="" />
      </div>
      <div className="container">
        <div className="title">
          <h1>TODO</h1>
          <button className="modeIcon" onClick={toggleDarkMode}>
            <img className="moon" src="/images/icon-moon.svg" alt="" />
            <img className="sun" src="/images/icon-sun.svg" alt="" />
          </button>
        </div>
        <input
          className="newTodo"
          placeholder="Create a new todo…"
          onKeyDown={addTodo}
        />
        <ul>
          {filteredTodos.map((item: TTodo) => (
            <li className={item.isDone ? "done" : ""} key={item.id}>
              <div className="listTitle">
                <input
                  className="checkBox"
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => markTodo(item.id)}
                  id={`todo-${item.id}`}
                />
                <label htmlFor={`todo-${item.id}`} className="custom-checkbox">
                  <span className="checked-icon"></span>
                </label>
                {item.title}
              </div>
              <button onClick={() => deleteTodo(item.id)}>
                <img
                  className="deleteTodo"
                  src="/images/icon-cross.svg"
                  alt=""
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="todoFilter">
          <span>{remainingTodosCount} items left</span>
          <div className="todoTypes">
            <span
              onClick={() => setFilter("ALL")}
              className={filter === "ALL" ? "active" : ""}
            >
              ALL
            </span>
            <span
              onClick={() => setFilter("Active")}
              className={filter === "Active" ? "active" : ""}
            >
              Active
            </span>
            <span
              onClick={() => setFilter("Completed")}
              className={filter === "Completed" ? "active" : ""}
            >
              Completed
            </span>
          </div>
          <span className="clearCompleted" onClick={clearCompleted}>
            Clear Completed
          </span>
        </div>
        <p className="instruction">Drag and drop to reorder list</p>
      </div>
    </>
  );
}
