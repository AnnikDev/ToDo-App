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
    if (event.key == "Enter") {
      const inputElement = event.target as HTMLInputElement;
      setTodos([
        ...todos,
        { id: Math.random(), title: inputElement.value, isDone: false },
      ]);
      inputElement.value = "";
    }
  };
  return (
    <>
      {" "}
      <div>
        <div className="title">
          <h1>TODO</h1>
          <img src="/images/icon-moon.svg" alt="" />
        </div>
        <input placeholder="Create a new todo…" onKeyDown={addTodo} />
        <ul>
          {todos.map((item: TTodo) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
      <div></div>
    </>
  );
}
