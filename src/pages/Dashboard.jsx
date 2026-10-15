import { useState, useEffect } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [subject, setSubject] = useState("Programming");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskInput,
        subject,
        dueDate,
        completed: false,
      },
    ]);

    setTaskInput("");
    setDueDate("");
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
    if (
      window.confirm(
        "Are you sure you want to delete all tasks?"
      )
    ) {
      setTasks([]);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-white p-8"
          : "min-h-screen bg-gray-100 text-black p-8"
      }
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Smart Study Planner
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded">
          <h2>Total Tasks</h2>
          <p className="text-3xl font-bold">
            {tasks.length}
          </p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          <h2>Completed</h2>
          <p className="text-3xl font-bold">
            {completedTasks}
          </p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded">
          <h2>Pending</h2>
          <p className="text-3xl font-bold">
            {pendingTasks}
          </p>
        </div>
      </div>

      <div
        className={
          darkMode
            ? "bg-gray-800 p-5 rounded mb-6"
            : "bg-white p-5 rounded shadow mb-6"
        }
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Name"
            value={taskInput}
            onChange={(e) =>
              setTaskInput(e.target.value)
            }
            className="border p-3 rounded text-black"
          />

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="border p-3 rounded text-black"
          >
            <option>Programming</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>English</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="border p-3 rounded text-black"
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white p-3 rounded"
          >
            Add Task
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Task..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded w-full mb-4 text-black"
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className="bg-gray-600 text-white px-3 py-2 rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          className="bg-red-600 text-white px-3 py-2 rounded"
        >
          Pending
        </button>
      </div>

      <button
        onClick={clearAllTasks}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        Clear All Tasks
      </button>

      {filteredTasks.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold">
            📚 No Tasks Found
          </h2>
          <p>Add your first study task.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={
                darkMode
                  ? "bg-gray-800 p-4 rounded flex justify-between items-center"
                  : "bg-white p-4 rounded shadow flex justify-between items-center"
              }
            >
              <div>
                <h3
                  className={
                    task.completed
                      ? "line-through text-green-500 font-bold"
                      : "font-bold"
                  }
                >
                  {task.title}
                </h3>

                <p>Subject: {task.subject}</p>

                <p>
                  Due Date:{" "}
                  {task.dueDate || "Not Set"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toggleComplete(task.id)
                  }
                  className="bg-green-500 text-white px-3 py-2 rounded"
                >
                  {task.completed
                    ? "Undo"
                    : "Complete"}
                </button>

                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;