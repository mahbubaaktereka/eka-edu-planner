import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [subject, setSubject] = useState("Programming");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

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
  };
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Smart Study Planner
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-5 rounded shadow mb-6">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Name"
            value={taskInput}
            onChange={(e) =>
              setTaskInput(e.target.value)
            }
            className="border p-3 rounded"
          />

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="border p-3 rounded"
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
            className="border p-3 rounded"
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
        className="border p-3 rounded w-full mb-4"
      />

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">
                {task.title}
              </h3>

              <p>
                Subject: {task.subject}
              </p>

              <p>
                Due Date: {task.dueDate || "Not Set"}
              </p>
            </div>

            <button
              onClick={() =>
                deleteTask(task._id)
              }
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;