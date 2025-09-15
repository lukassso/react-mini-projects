import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
}

const initialTasks: Task[] = [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Practice TypeScript" },
  { id: 3, text: "Build a project" },
  { id: 4, text: "Deploy the app" },
];

const SortableList: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: number) => {
    setDraggedItemId(id);
    console.log("co dragujesz: ", draggedItemId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetId: number) => {
    e.preventDefault();
    if (draggedItemId === null) return;

    const newItems = [...tasks];
    const draggedIndex = newItems.findIndex(
      (task) => task.id === draggedItemId
    );
    console.log("draggedIndex: ", draggedIndex);
    const targetIndex = newItems.findIndex((task) => task.id === targetId);
    console.log("targetIndex: ", targetIndex);

    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    setTasks(newItems);
    setDraggedItemId(null);
    console.log("task array:", tasks);
    console.log("dratgedItem: ", draggedItemId);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Sortable Task List</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, task.id)}
            className="p-3 bg-white shadow rounded cursor-grab active:cursor-grabbing"
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortableList;
