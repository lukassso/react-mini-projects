import React, { useState, useEffect } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/?_limit=10`);
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) setError(`${err}`);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodoTitle.trim()) return;
    try {
      const responseAdd = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTodoTitle,
          completed: false,
        }),
      });
      setNewTodoTitle("");
      const dataAdd = await responseAdd.json();
      setTodos((prevTodos) => [...prevTodos, dataAdd]);
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err}`);
        throw new Error(`something went wrong: ${err}`);
      }
    }
  };

  const handleToggleComplete = async (
    todoId: number,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    try {
      const response = await fetch(`${API_URL}/${todoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: newStatus,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, completed: newStatus };
          }
          return todo;
        })
      );
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const response = await fetch(`${API_URL}/:${todoId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Todo List (CRUD)</h1>
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded"
          >
            <span
              onClick={() => handleToggleComplete(todo.id, todo.completed)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
