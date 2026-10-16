import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [subject, setSubject] = useState("💻 Programming");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: taskInput,
          subject,
          dueDate,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      setTasks([...tasks, res.data]);

      setTaskInput("");
      setDueDate("");
    } catch (error) {
      console.log(error);
    }
  }; const toggleComplete = async (id) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );

    setTasks(
      tasks.map((task) =>
        task._id === id ? res.data : task
      )
    );

  } catch (error) {
    console.log(error);
  }
};
``
    const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      setTasks(
        tasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  

   
  const today = new Date()
  .toISOString()
  .split("T")[0];

 const todayTasks = tasks.filter(
  (task) =>
    task.dueDate === today &&
    !task.completed
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-5xl font-bold text-pink-500">
             Eka's Edu Planner 🎀
          </h1>

          <p className="text-xl text-gray-700 mt-3">
            Welcome, {user?.name} 🌷
          </p>

          <p className="text-pink-400 mt-2">
            Stay organized, study smarter and achieve your goals ✨
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-3 rounded-2xl shadow-md"
        >
          💜 Logout
        </button>

      </div>
      <div className="bg-yellow-100 border border-yellow-300 p-5 rounded-3xl shadow-md mb-6">

  <h3 className="text-xl font-bold">
    🔔 Today's Reminders
  </h3>

  {todayTasks.length > 0 ? (
    <div className="mt-3 space-y-2">

      {todayTasks.map((task) => (
        <p key={task._id}>
          📚 {task.title}
        </p>
      ))}

    </div>
  ) : (
    <p className="mt-3 text-gray-600">
      🎉 No tasks due today!
    </p>
  )}

</div>
      <div className="bg-pink-100 border border-pink-200 p-6 rounded-3xl shadow-md mb-6">

        <div className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="📝 Task Name"
            value={taskInput}
            onChange={(e) =>
              setTaskInput(e.target.value)
            }
            className="border border-pink-300 p-3 rounded-2xl"
          />

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="border border-pink-300 p-3 rounded-2xl"
          >
            <option>💻 Programming</option>
            <option>📐 Mathematics</option>
            <option>⚛️ Physics</option>
            <option>📚 English</option>
          </select>
                    <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="border border-pink-300 p-3 rounded-2xl"
          />

          <button
            onClick={addTask}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-3 rounded-2xl shadow-md"
          >
            ✨ Add Task
          </button>

        </div>
      </div>

      <input
        type="text"
        placeholder="🔍 Search Task..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border border-pink-300 p-3 rounded-2xl w-full mb-4"
      />

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-4xl font-bold text-pink-500">
            🧸 No Study Tasks Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Add your first task and start
            your productive journey ✨
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-pink-50 border border-pink-200 p-4 rounded-3xl shadow-md flex justify-between items-center"
            >
              <div>
                <h3
                   className={`font-bold text-lg ${
                     task.completed
                    ? "line-through text-green-600"
                    : ""
                      }`}
>
                     {task.title}
                     </h3>

                <p className="mt-1">
                  {task.subject}
                </p>

                <p className="text-sm text-gray-500">
                  Due Date: {task.dueDate || "Not Set"}
                </p>
              </div>

               <div className="flex gap-2">

  <button
    onClick={() =>
      toggleComplete(task._id)
    }
    className={`px-4 py-2 rounded-2xl text-white ${
      task.completed
        ? "bg-yellow-500"
        : "bg-green-500"
    }`}
  >
    {task.completed
      ? "✅ Completed"
      : "✅ Complete"}
  </button>

  <button
    onClick={() =>
      deleteTask(task._id)
    }
    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-2xl"
  >
    🗑 Delete
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