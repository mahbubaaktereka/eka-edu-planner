import { useState, useEffect } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskInput,
        completed: false,
      },
    ]);

    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-5">
        Study Planner Dashboard
      </h1>

      <div className="flex gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded">
          Total: {tasks.length}
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          Completed: {completedTasks}
        </div>

        <div className="bg-red-500 text-white p-4 rounded">
          Pending: {pendingTasks}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a study task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="border p-3 rounded w-80"
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add Task
        </button>

        <button
          onClick={clearAllTasks}
          className="bg-gray-700 text-white px-4 rounded"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <span
              className={
                task.completed
                  ? "line-through text-green-600"
                  : ""
              }
            >
              {task.title}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(task.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;