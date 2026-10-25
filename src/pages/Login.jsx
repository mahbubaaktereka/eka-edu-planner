import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://server-cyan-omega.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4">

      <div className="bg-white/80 backdrop-blur-md border border-pink-200 shadow-xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-5xl font-bold text-center text-pink-500">
           Eka's Edu Planner 🎀
        </h1>

        <p className="text-center text-pink-400 mt-3">
          Plan. Study. Shine. ✨
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
        >

          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-pink-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-pink-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-2xl shadow-md hover:scale-105 transition duration-300"
          >
            ✨ Login
          </button>

        </form>

        <p className="text-center text-pink-400 mt-4 italic">
          "Every study session brings you closer to your dreams." 🌸
        </p>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-500 font-bold hover:text-pink-600"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;