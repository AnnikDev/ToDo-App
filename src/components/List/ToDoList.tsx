import "./ToDoList.css";
import { useState, KeyboardEvent } from "react";

type TTodo = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function ToDo() {
  const [todos, setTodos] = useState<TTodo[]>([]);

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
    const deleteIndex = todos.findIndex((item) => item.id == todoId);
    todos.splice(deleteIndex, 1);
    setTodos([...todos]);
  };

  const markTodo = (todoId: number): void => {
    const markIndex = todos.findIndex((item) => item.id == todoId);
    todos[markIndex].isDone = !todos[markIndex].isDone;
    setTodos([...todos]);
  };

  return (
    <>
      <div>
        <img src="/images/bg-desktop-light.jpg" alt="" />
      </div>
      <div className="container">
        <div className="title">
          <h1>TODO</h1>
          <img src="/images/icon-moon.svg" alt="" />
        </div>
        <input
          className="newTodo"
          placeholder="Create a new todo…"
          onKeyDown={addTodo}
        />
        <ul>
          {todos.map((item: TTodo) => (
            <li
              style={{ textDecoration: item.isDone ? "line-through" : "" }}
              key={item.id}
            >
              <input
                className="checkBox"
                type="checkbox"
                name=""
                id=""
                onChange={() => markTodo(item.id)}
              />
              {item.title}
              <button onClick={() => deleteTodo(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path
                    fill="#494C6B"
                    fill-rule="evenodd"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="todoFilter">
          <span>5 items left</span>
          <div className="todoTypes">
            <span>ALL</span>
            <span>Active</span>
            <span>Completed</span>
          </div>
          <span>Clear Completed</span>
        </div>
      </div>
      <div></div>
    </>
  );
}
