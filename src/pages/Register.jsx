import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://server-cyan-omega.vercel.app/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("🎉 Registration Successful!");
      navigate("/");
     } catch (error) {
        console.log(error);
        alert(
         JSON.stringify(error.response?.data) ||
           error.message ||
            "Registration Failed"
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
          Create your study journey ✨
        </p>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-4"
        >

          <input
            type="text"
            placeholder="🌷 Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border border-pink-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

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
            🌸 Register
          </button>

        </form>

        <p className="text-center text-pink-400 mt-4 italic">
          "Your future is created by what you do today." ✨
        </p>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-pink-500 font-bold hover:text-pink-600"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;